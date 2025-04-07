-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location JSONB NOT NULL,
    media JSONB DEFAULT '{"images": [], "videos": []}',
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    registered_count INTEGER DEFAULT 0 CHECK (registered_count >= 0),
    price DECIMAL(10,2),
    contact JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'rejected', 'cancelled')),
    created_by UUID REFERENCES auth.users(id) NOT NULL,
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON event_registrations(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for events
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('event-videos', 'event-videos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies

-- Events policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política para visualização pública
CREATE POLICY "Events are viewable by everyone when published"
ON events FOR SELECT
USING (status = 'published');

-- Política para criadores verem seus próprios eventos
CREATE POLICY "Users can view their own events"
ON events FOR SELECT
TO authenticated
USING (auth.uid() = created_by);

-- Política para aprovadores verem eventos pendentes
CREATE POLICY "Approvers can view pending events"
ON events FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM auth.users 
        WHERE auth.uid() = id AND role = 'approver'
    ) 
    AND status = 'pending_review'
);

-- Política para criação de eventos
CREATE POLICY "Users can create events"
ON events FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Política para atualização de eventos próprios
CREATE POLICY "Users can update their own draft events"
ON events FOR UPDATE
TO authenticated
USING (
    auth.uid() = created_by 
    AND status IN ('draft', 'rejected')
);

-- Política para aprovadores
CREATE POLICY "Approvers can update event status"
ON events FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM auth.users 
        WHERE auth.uid() = id AND role = 'approver'
    )
);

-- Event registrations policies
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own registrations"
ON event_registrations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Event owners can view their event registrations"
ON event_registrations FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM events 
        WHERE events.id = event_id 
        AND events.created_by = auth.uid()
    )
);

CREATE POLICY "Users can register for published events"
ON event_registrations FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
        SELECT 1 
        FROM events 
        WHERE events.id = event_id 
        AND events.status = 'published'
    )
);

CREATE POLICY "Users can cancel their own registrations"
ON event_registrations FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Storage policies
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "Videos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-videos');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'event-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'event-videos' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

-- Função para contagem de registros
CREATE OR REPLACE FUNCTION increment_registered_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'registered' AND (OLD IS NULL OR OLD.status != 'registered') THEN
        UPDATE events 
        SET registered_count = registered_count + 1
        WHERE id = NEW.event_id;
    ELSIF NEW.status = 'cancelled' AND OLD.status = 'registered' THEN
        UPDATE events 
        SET registered_count = registered_count - 1
        WHERE id = NEW.event_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar contagem
CREATE TRIGGER update_event_count
    AFTER INSERT OR UPDATE ON event_registrations
    FOR EACH ROW
    EXECUTE FUNCTION increment_registered_count();

-- Sample event
INSERT INTO events (
    title,
    description,
    date,
    time,
    location,
    capacity,
    price,
    contact,
    status
) VALUES (
    'Nick Vujicic Tour Brasil 2025 - Brasília',
    'Palestra motivacional com Nick Vujicic, um dos maiores palestrantes cristãos do mundo.',
    '2025-06-15',
    '19:00',
    '{"address": "Centro de Convenções Ulysses Guimarães", "city": "Brasília", "state": "DF", "coordinates": {"lat": -15.7942, "lng": -47.8825}}',
    5000,
    297.00,
    '{"name": "Organização Tour Brasil", "email": "contato@tourbrasil.com.br", "phone": "(61) 98888-7777"}',
    'published'
); 