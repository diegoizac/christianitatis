# Componentes do Christianitatis

## 🎨 Componentes de UI

### Header

O componente de cabeçalho principal da aplicação.

\`\`\`typescript
import Header from './components/Header';

<Header 
  isScrolled={boolean} 
  setActiveModal={(modalId: string | null) => void} 
/>
\`\`\`

#### Props

- `isScrolled`: Controla o estilo do header quando a página é rolada
- `setActiveModal`: Função para controlar a exibição de modais

### Footer

O componente de rodapé da aplicação.

\`\`\`typescript
import Footer from './components/Footer';

<Footer 
  setActiveModal={(modalId: string | null) => void} 
/>
\`\`\`

#### Props

- `setActiveModal`: Função para controlar a exibição de modais

### Modal

Componente de modal reutilizável.

\`\`\`typescript
import Modal from './components/Modal';

<Modal
id="modal-id"
isOpen={boolean}
onClose={() => void}
title="Título do Modal"

> Conteúdo do Modal
> </Modal>
> \`\`\`

#### Props

- `id`: Identificador único do modal
- `isOpen`: Controla a visibilidade do modal
- `onClose`: Função chamada ao fechar o modal
- `title`: Título do modal
- `children`: Conteúdo do modal

### EventCard

Card para exibição de eventos.

\`\`\`typescript
import EventCard from './components/EventCard';

<EventCard
imageUrl="path/to/image.jpg"
title="Título do Evento"
location="Local do Evento"
address="Endereço do Evento"
time="19H"
info="Informações adicionais"
videoUrl="path/to/video.mp4" // opcional
/>
\`\`\`

#### Props

- `imageUrl`: URL da imagem do evento
- `title`: Título do evento
- `location`: Local do evento
- `address`: Endereço completo
- `time`: Horário do evento
- `info`: Informações adicionais
- `videoUrl`: URL do vídeo (opcional)

### ContactForm

Formulário de contato com validação e integração com Supabase.

\`\`\`typescript
import ContactForm from './components/ContactForm';

<ContactForm
onSuccess={() => void}
onError={(error: string) => void}
/>
\`\`\`

#### Props

- `onSuccess`: Callback executado após envio bem-sucedido
- `onError`: Callback executado em caso de erro

### Animation

Componente de animação personalizado.

\`\`\`typescript
import Animation from './components/Animation';

<Animation
style={{ /* estilos CSS */ }}
/>
\`\`\`

#### Props

- `style`: Objeto de estilos CSS

### SocialIcons

Componente para exibição de ícones de redes sociais.

\`\`\`typescript
import SocialIcons from './components/SocialIcons';

<SocialIcons />
\`\`\`

## 🔧 Hooks Personalizados

### useModal

Hook para gerenciamento de modais.

\`\`\`typescript
import { useModal } from '../hooks/useModal';

const { activeModal, setActiveModal } = useModal();
\`\`\`

### useScroll

Hook para detecção de rolagem.

\`\`\`typescript
import { useScroll } from '../hooks/useScroll';

const { isScrolled } = useScroll();
\`\`\`

## 🎯 Boas Práticas

1. **Componentização**

   - Mantenha componentes pequenos e focados
   - Use composição ao invés de herança
   - Extraia lógica complexa para hooks personalizados

2. **Props**

   - Use TypeScript para tipar todas as props
   - Documente props obrigatórias e opcionais
   - Forneça valores padrão quando apropriado

3. **Estado**

   - Mantenha o estado o mais local possível
   - Use Context API para estado global
   - Evite prop drilling

4. **Performance**

   - Use React.memo() para componentes que recebem as mesmas props frequentemente
   - Evite re-renders desnecessários
   - Utilize useMemo e useCallback quando apropriado

5. **Acessibilidade**

   - Adicione atributos ARIA apropriados
   - Garanta navegação por teclado
   - Mantenha contraste adequado

6. **Testes**
   - Escreva testes para lógica de negócio
   - Teste interações do usuário
   - Mantenha cobertura de testes acima de 80%

## 📚 Exemplos

### Modal com Formulário

\`\`\`typescript
<Modal
id="contact-modal"
isOpen={activeModal === 'contact-modal'}
onClose={() => setActiveModal(null)}
title="Contato"

> <ContactForm

    onSuccess={() => {
      toast.success('Mensagem enviada!');
      setActiveModal(null);
    }}
    onError={(error) => toast.error(error)}

/>
</Modal>
\`\`\`

### Card de Evento com Vídeo

\`\`\`typescript
<EventCard
  imageUrl="/assets/images/event-1.jpg"
  title="Evento em São Paulo"
  location="Teatro Municipal"
  address="Praça Ramos de Azevedo, s/n"
  time="20H"
  info="(11) 3053-2090"
  videoUrl="/assets/videos/event-1.mp4"
/>
\`\`\`

## 🔄 Fluxo de Dados

1. **Formulário de Contato**

   ```
   User Input -> Validação -> Supabase -> Notificação
   ```

2. **Carregamento de Eventos**

   ```
   Montagem do Componente -> Fetch de Dados -> Renderização
   ```

3. **Interação com Modal**
   ```
   Click -> setActiveModal -> Render Modal -> User Action -> Close
   ```
