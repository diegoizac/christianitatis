-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INTEGER,
  image_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS events_status_idx ON events(status);
CREATE INDEX IF NOT EXISTS events_user_id_idx ON events(user_id);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);

-- Add RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy for viewing events:
-- - Published events are visible to everyone
-- - Users can see their own events
CREATE POLICY "events_view_policy" ON events
  FOR SELECT USING (
    status = 'published' OR 
    auth.uid() = user_id
  );

-- Policy for inserting events:
-- Only authenticated users can create events
CREATE POLICY "events_insert_policy" ON events
  FOR INSERT WITH CHECK (
    auth.role() IN ('authenticated')
  );

-- Policy for updating events:
-- - Users can update their own events
-- - Approvers can update any event
CREATE POLICY "events_update_policy" ON events
  FOR UPDATE USING (
    auth.uid() = user_id OR
    auth.role() = 'approver'
  );

-- Policy for deleting events:
-- Users can only delete their own draft events
CREATE POLICY "events_delete_policy" ON events
  FOR DELETE USING (
    auth.uid() = user_id AND
    status = 'draft'
  );

-- Create enum type for event status
CREATE TYPE event_status AS ENUM (
  'draft',
  'pending_review',
  'published',
  'rejected',
  'cancelled'
);

-- Add check constraint to ensure valid status values
ALTER TABLE events ADD CONSTRAINT events_status_check 
  CHECK (status::event_status IN (
    'draft',
    'pending_review',
    'published',
    'rejected',
    'cancelled'
  )); 