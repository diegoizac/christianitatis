# Tipos do Christianitatis

## 📝 Interfaces

### Event

Interface para eventos.

\`\`\`typescript
interface Event {
id: string;
imageUrl: string;
title: string;
location: string;
address: string;
time: string;
info: string;
videoUrl?: string;
}
\`\`\`

### ContactFormData

Interface para dados do formulário de contato.

\`\`\`typescript
interface ContactFormData {
name: string;
email: string;
phone: string;
message: string;
}
\`\`\`

### ModalProps

Interface para props do componente Modal.

\`\`\`typescript
interface ModalProps {
id: string;
isOpen: boolean;
onClose: () => void;
title: string;
children: React.ReactNode;
}
\`\`\`

### HeaderProps

Interface para props do componente Header.

\`\`\`typescript
interface HeaderProps {
isScrolled: boolean;
setActiveModal: (modalId: string | null) => void;
}
\`\`\`

### FooterProps

Interface para props do componente Footer.

\`\`\`typescript
interface FooterProps {
setActiveModal: (modalId: string | null) => void;
}
\`\`\`

### EventCardProps

Interface para props do componente EventCard.

\`\`\`typescript
interface EventCardProps extends Event {
className?: string;
}
\`\`\`

### ContactFormProps

Interface para props do componente ContactForm.

\`\`\`typescript
interface ContactFormProps {
onSuccess: () => void;
onError: (error: string) => void;
}
\`\`\`

## 🔄 Types

### ModalId

Type para IDs de modal.

\`\`\`typescript
type ModalId = 'contact' | 'event' | 'about' | null;
\`\`\`

### SetModalFunction

Type para função de controle de modal.

\`\`\`typescript
type SetModalFunction = (modalId: ModalId) => void;
\`\`\`

### ValidationFunction

Type para funções de validação.

\`\`\`typescript
type ValidationFunction = (value: string) => string | null;
\`\`\`

## 🎯 Enums

### EventType

Enum para tipos de eventos.

\`\`\`typescript
enum EventType {
CONCERT = 'concert',
WORKSHOP = 'workshop',
EXHIBITION = 'exhibition'
}
\`\`\`

### FormStatus

Enum para status do formulário.

\`\`\`typescript
enum FormStatus {
IDLE = 'idle',
SUBMITTING = 'submitting',
SUCCESS = 'success',
ERROR = 'error'
}
\`\`\`

## 📚 Exemplos de Uso

### Tipando um Componente

\`\`\`typescript
import { FC } from 'react';
import { EventCardProps } from '../types';

const EventCard: FC<EventCardProps> = ({
imageUrl,
title,
location,
address,
time,
info,
videoUrl,
className
}) => {
// Implementação
};

export default EventCard;
\`\`\`

### Usando Types em Hooks

\`\`\`typescript
import { useState } from 'react';
import { ModalId } from '../types';

const useModal = () => {
const [activeModal, setActiveModal] = useState<ModalId>(null);

return { activeModal, setActiveModal };
};
\`\`\`

### Validação com Types

\`\`\`typescript
import { ValidationFunction } from '../types';

const validateEmail: ValidationFunction = (email) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email) ? null : 'Email inválido';
};
\`\`\`

## 🔧 Boas Práticas

1. **Nomenclatura**

   - Use PascalCase para interfaces e types
   - Adicione sufixo Props para props de componentes
   - Use verbos para funções

2. **Organização**

   - Agrupe tipos relacionados
   - Exporte todos os tipos de um arquivo index.ts
   - Mantenha tipos próximos aos componentes que os utilizam

3. **Documentação**

   - Adicione comentários JSDoc para tipos complexos
   - Documente valores possíveis para enums
   - Mantenha exemplos de uso atualizados

4. **Tipagem**

   - Evite any
   - Use union types ao invés de tipos genéricos
   - Aproveite inferência de tipos quando possível

5. **Manutenção**
   - Revise tipos regularmente
   - Atualize documentação ao modificar tipos
   - Mantenha compatibilidade com versões anteriores
