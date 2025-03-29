# Testes do Christianitatis

## 🧪 Configuração de Testes

### Vitest

Configuração do Vitest para testes unitários.

\`\`\`typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
test: {
environment: 'jsdom',
globals: true,
setupFiles: ['./src/tests/setup.ts']
}
});
\`\`\`

### Setup

Configuração inicial dos testes.

\`\`\`typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
value: vi.fn().mockImplementation(query => ({
matches: false,
media: query,
onchange: null,
addListener: vi.fn(),
removeListener: vi.fn()
}))
});

// Mock do IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
observe: () => null,
unobserve: () => null,
disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;
\`\`\`

## 📝 Testes de Componentes

### Header

Testes do componente Header.

\`\`\`typescript
// src/tests/components/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../components/Header';

describe('Header', () => {
it('deve renderizar corretamente', () => {
render(<Header isScrolled={false} setActiveModal={() => {}} />);
expect(screen.getByRole('banner')).toBeInTheDocument();
});

it('deve aplicar classe de scroll quando rolado', () => {
const { rerender } = render(
<Header isScrolled={false} setActiveModal={() => {}} />
);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('bg-primary');

    rerender(<Header isScrolled={true} setActiveModal={() => {}} />);
    expect(header).toHaveClass('bg-primary');

});

it('deve chamar setActiveModal ao clicar no botão de contato', () => {
const setActiveModal = vi.fn();
render(<Header isScrolled={false} setActiveModal={setActiveModal} />);

    fireEvent.click(screen.getByText('Contato'));
    expect(setActiveModal).toHaveBeenCalledWith('contact');

});
});
\`\`\`

### EventCard

Testes do componente EventCard.

\`\`\`typescript
// src/tests/components/EventCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EventCard from '../../components/EventCard';

describe('EventCard', () => {
const mockEvent = {
imageUrl: '/test.jpg',
title: 'Teste Evento',
location: 'Local Teste',
address: 'Endereço Teste',
time: '19H',
info: 'Info Teste'
};

it('deve renderizar informações do evento', () => {
render(<EventCard {...mockEvent} />);

    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.time)).toBeInTheDocument();

});

it('deve renderizar vídeo quando videoUrl é fornecida', () => {
render(<EventCard {...mockEvent} videoUrl="/test.mp4" />);
expect(screen.getByTestId('event-video')).toBeInTheDocument();
});
});
\`\`\`

### ContactForm

Testes do componente ContactForm.

\`\`\`typescript
// src/tests/components/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from '../../components/ContactForm';

describe('ContactForm', () => {
const mockSubmit = {
onSuccess: vi.fn(),
onError: vi.fn()
};

beforeEach(() => {
vi.clearAllMocks();
});

it('deve validar campos obrigatórios', async () => {
render(<ContactForm {...mockSubmit} />);

    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    });

});

it('deve enviar formulário com dados válidos', async () => {
render(<ContactForm {...mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Teste' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'teste@teste.com' }
    });
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Mensagem teste' }
    });

    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(mockSubmit.onSuccess).toHaveBeenCalled();
    });

});
});
\`\`\`

## 🔄 Testes de Hooks

### useModal

Testes do hook useModal.

\`\`\`typescript
// src/tests/hooks/useModal.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useModal } from '../../hooks/useModal';

describe('useModal', () => {
it('deve iniciar com modal fechado', () => {
const { result } = renderHook(() => useModal());
expect(result.current.activeModal).toBeNull();
});

it('deve abrir e fechar modal', () => {
const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setActiveModal('contact');
    });
    expect(result.current.activeModal).toBe('contact');

    act(() => {
      result.current.setActiveModal(null);
    });
    expect(result.current.activeModal).toBeNull();

});
});
\`\`\`

## 🌐 Testes de Serviços

### Supabase

Testes dos serviços do Supabase.

\`\`\`typescript
// src/tests/services/supabase.test.ts
import { describe, it, expect, vi } from 'vitest';
import { insertContact, getEvents } from '../../services/supabase';
import { supabase } from '../../config/supabaseClient';

vi.mock('../../config/supabaseClient', () => ({
supabase: {
from: vi.fn().mockReturnThis(),
insert: vi.fn(),
select: vi.fn(),
order: vi.fn()
}
}));

describe('Supabase Services', () => {
it('deve inserir contato', async () => {
const mockContact = {
name: 'Teste',
email: 'teste@teste.com',
message: 'Teste'
};

    supabase.insert.mockResolvedValueOnce({ data: mockContact });

    const result = await insertContact(mockContact);
    expect(result).toEqual(mockContact);

});

it('deve buscar eventos', async () => {
const mockEvents = [
{ id: 1, title: 'Evento 1' },
{ id: 2, title: 'Evento 2' }
];

    supabase.select.mockResolvedValueOnce({ data: mockEvents });

    const result = await getEvents();
    expect(result).toEqual(mockEvents);

});
});
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Mantenha estrutura de testes espelhando código
   - Use describe para agrupar testes relacionados
   - Nomeie testes de forma descritiva

2. **Mocks**

   - Mock apenas o necessário
   - Reset mocks entre testes
   - Use mocks realistas

3. **Assertions**

   - Teste comportamento, não implementação
   - Use matchers apropriados
   - Verifique estados negativos

4. **Performance**

   - Evite testes lentos
   - Use setup/teardown eficiente
   - Agrupe testes similares

5. **Manutenção**
   - Mantenha testes simples
   - Atualize testes com código
   - Documente casos especiais

## 📚 Exemplos

### Teste de Integração

\`\`\`typescript
// src/tests/integration/contact.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';

describe('Fluxo de Contato', () => {
it('deve completar fluxo de contato', async () => {
render(<App />);

    // Abre modal
    fireEvent.click(screen.getByText('Contato'));

    // Preenche formulário
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Teste' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'teste@teste.com' }
    });
    fireEvent.change(screen.getByLabelText('Mensagem'), {
      target: { value: 'Mensagem teste' }
    });

    // Envia formulário
    fireEvent.click(screen.getByText('Enviar'));

    // Verifica sucesso
    await waitFor(() => {
      expect(screen.getByText('Mensagem enviada!')).toBeInTheDocument();
    });

});
});
\`\`\`

### Teste de Snapshot

\`\`\`typescript
// src/tests/components/EventCard.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EventCard from '../../components/EventCard';

describe('EventCard Snapshot', () => {
it('deve manter aparência consistente', () => {
const { container } = render(
<EventCard
        imageUrl="/test.jpg"
        title="Teste"
        location="Local"
        address="Endereço"
        time="19H"
        info="Info"
      />
);

    expect(container).toMatchSnapshot();

});
});
\`\`\`

## 🔄 Fluxo de Testes

1. **Desenvolvimento**

   ```
   Escrever Teste -> Implementar -> Verificar -> Refatorar
   ```

2. **CI/CD**

   ```
   Push -> Testes Unitários -> Testes E2E -> Deploy
   ```

3. **Manutenção**
   ```
   Bug Report -> Teste Falha -> Correção -> Teste Passa
   ```
