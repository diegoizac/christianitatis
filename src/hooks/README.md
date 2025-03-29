# Hooks do Christianitatis

## 🎣 Hooks Personalizados

### useModal

Hook para gerenciamento de modais.

\`\`\`typescript
import { useState } from 'react';

type ModalId = 'contact' | 'event' | 'about' | null;

export const useModal = () => {
const [activeModal, setActiveModal] = useState<ModalId>(null);

const openModal = (id: ModalId) => setActiveModal(id);
const closeModal = () => setActiveModal(null);

return {
activeModal,
openModal,
closeModal
};
};

// Exemplo de uso
const { activeModal, openModal, closeModal } = useModal();
\`\`\`

### useScroll

Hook para detecção de rolagem.

\`\`\`typescript
import { useState, useEffect } from 'react';

export const useScroll = (threshold = 50) => {
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => {
setIsScrolled(window.scrollY > threshold);
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

}, [threshold]);

return { isScrolled };
};

// Exemplo de uso
const { isScrolled } = useScroll(100);
\`\`\`

### useForm

Hook para gerenciamento de formulários.

\`\`\`typescript
import { useState, FormEvent } from 'react';

interface FormData {
[key: string]: string;
}

interface UseFormProps {
initialValues: FormData;
onSubmit: (data: FormData) => Promise<void>;
validate?: (data: FormData) => Record<string, string>;
}

export const useForm = ({ initialValues, onSubmit, validate }: UseFormProps) => {
const [values, setValues] = useState<FormData>(initialValues);
const [errors, setErrors] = useState<Record<string, string>>({});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
setValues(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }

};

return {
values,
errors,
isSubmitting,
handleChange,
handleSubmit
};
};

// Exemplo de uso
const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
initialValues: { name: '', email: '' },
onSubmit: async (data) => {
await submitToAPI(data);
},
validate: (data) => {
const errors = {};
if (!data.name) errors.name = 'Nome é obrigatório';
if (!data.email) errors.email = 'Email é obrigatório';
return errors;
}
});
\`\`\`

### useLocalStorage

Hook para persistência em localStorage.

\`\`\`typescript
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
const [storedValue, setStoredValue] = useState<T>(() => {
try {
const item = window.localStorage.getItem(key);
return item ? JSON.parse(item) : initialValue;
} catch (error) {
console.error(error);
return initialValue;
}
});

useEffect(() => {
try {
window.localStorage.setItem(key, JSON.stringify(storedValue));
} catch (error) {
console.error(error);
}
}, [key, storedValue]);

return [storedValue, setStoredValue] as const;
};

// Exemplo de uso
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

### useMediaQuery

Hook para responsividade.

\`\`\`typescript
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
const [matches, setMatches] = useState(false);

useEffect(() => {
const media = window.matchMedia(query);
setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);

}, [query]);

return matches;
};

// Exemplo de uso
const isMobile = useMediaQuery('(max-width: 768px)');
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Um hook por arquivo
   - Nomes descritivos
   - Documentação clara

2. **Performance**

   - Memoização quando necessário
   - Limpeza de efeitos
   - Evite recriação de funções

3. **Tipagem**

   - Use TypeScript
   - Defina interfaces
   - Evite any

4. **Testes**

   - Teste casos de uso
   - Verifique limpeza
   - Mock APIs externas

5. **Manutenção**
   - Mantenha hooks simples
   - Documente mudanças
   - Versione adequadamente

## 📚 Exemplos de Uso

### Combinando Hooks

\`\`\`typescript
const EventModal = ({ eventId }: { eventId: string }) => {
const { activeModal, closeModal } = useModal();
const isMobile = useMediaQuery('(max-width: 768px)');
const [lastViewedEvent, setLastViewedEvent] = useLocalStorage('lastEvent', null);

useEffect(() => {
if (activeModal === 'event') {
setLastViewedEvent(eventId);
}
}, [activeModal, eventId]);

return (
<Modal
id="event"
isOpen={activeModal === 'event'}
onClose={closeModal}
fullScreen={isMobile} >
{/_ Conteúdo do modal _/}
</Modal>
);
};
\`\`\`

### Formulário com Validação

\`\`\`typescript
const ContactForm = () => {
const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
initialValues: {
name: '',
email: '',
message: ''
},
validate: (data) => {
const errors = {};
if (!data.name) errors.name = 'Nome é obrigatório';
if (!data.email) errors.email = 'Email é obrigatório';
if (!data.message) errors.message = 'Mensagem é obrigatória';
return errors;
},
onSubmit: async (data) => {
await submitContact(data);
}
});

return (
<form onSubmit={handleSubmit}>
{/_ Campos do formulário _/}
</form>
);
};
\`\`\`

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**

   ```
   Identificar Necessidade -> Implementar Hook -> Testar -> Documentar
   ```

2. **Manutenção**

   ```
   Monitorar Uso -> Otimizar -> Atualizar Docs -> Deploy
   ```

3. **Atualizações**
   ```
   Proposta -> Review -> Testes -> Merge
   ```
