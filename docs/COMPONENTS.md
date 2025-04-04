# 🧩 Documentação de Componentes

## 📝 Índice

1. [Form](#form)
2. [Input](#input)
3. [Button](#button)
4. [Card](#card)
5. [Section](#section)
6. [Header](#header)
7. [ContactForm](#contactform)

## Form

O componente Form é um componente de formulário avançado que suporta validação, estados de erro e integração com TypeScript.

### Props

\`\`\`typescript
interface FormProps<T> {
children: ((props: FormRenderProps<T>) => ReactNode) | ReactNode
config: FormConfig<T>
onSubmit: (data: T) => void | Promise<void>
className?: string
}

interface FormConfig<T> {
[K in keyof T]: {
initialValue: T[K]
validate?: Array<{
validate: (value: T[K]) => boolean
message: string
}>
}
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
<Form<ContactFormData>
config={{
    name: {
      initialValue: '',
      validate: [
        {
          validate: (value) => value.length > 0,
          message: 'Nome é obrigatório'
        }
      ]
    },
    email: {
      initialValue: '',
      validate: [
        {
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: 'Email inválido'
        }
      ]
    }
  }}
onSubmit={handleSubmit}

> {({ values, errors, handleChange }) => (

    <>
      <TextInput
        name="name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />
      <TextInput
        name="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />
    </>

)}

</Form>
\`\`\`

## Input

O sistema de Input inclui TextInput, Select e Textarea, todos com uma API consistente.

### TextInput Props

\`\`\`typescript
interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
label?: string
error?: string
size?: 'sm' | 'md' | 'lg'
variant?: 'outline' | 'filled'
leftIcon?: React.ReactNode
rightIcon?: React.ReactNode
helperText?: string
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
<TextInput
label="Email"
name="email"
type="email"
leftIcon={<EmailIcon />}
error={errors.email}
helpText="Digite seu melhor email"
size="md"
variant="outline"
/>
\`\`\`

## Button

Componente de botão com suporte a variantes, estados e animações.

### Props

\`\`\`typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
variant?: 'primary' | 'secondary' | 'accent'
size?: 'sm' | 'md' | 'lg'
isLoading?: boolean
children: React.ReactNode
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
<Button
variant="primary"
size="md"
isLoading={loading}
onClick={handleClick}

> Enviar
> </Button>
> \`\`\`

## Card

Componente de card com efeitos visuais e suporte a diferentes conteúdos.

### Props

\`\`\`typescript
interface CardProps {
title?: string
subtitle?: string
children: ReactNode
tags?: string[]
href?: string
image?: string
className?: string
variant?: 'default' | 'project' | 'feature'
size?: 'sm' | 'md' | 'lg'
onClick?: () => void
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
<Card
title="Título do Card"
subtitle="Subtítulo explicativo"
image="/path/to/image.jpg"
tags={['tag1', 'tag2']}
size="md"
variant="default"

>

  <p>Conteúdo do card aqui...</p>
</Card>
\`\`\`

## Section

Componente de seção com suporte a acessibilidade e variantes de estilo.

### Props

\`\`\`typescript
interface SectionProps {
title?: string
subtitle?: string
children: ReactNode
className?: string
variant?: 'default' | 'alternate'
id?: string
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript

<Section
  title="Título da Seção"
  subtitle="Subtítulo explicativo"
  variant="default"
  id="minha-secao"
>
  <p>Conteúdo da seção aqui...</p>
</Section>
\`\`\`

## Header

Componente de cabeçalho responsivo com navegação e autenticação.

### Props

\`\`\`typescript
interface HeaderProps {
isScrolled?: boolean
setActiveModal: (modal: string | null) => void
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript

<Header
  isScrolled={isScrolled}
  setActiveModal={setActiveModal}
/>
\`\`\`

## ContactForm

Formulário de contato com validação e feedback visual.

### Props

\`\`\`typescript
interface ContactFormProps {
onSubmit: (data: ContactFormData) => Promise<void>
}

type ContactFormData = {
name: string
email: string
phone: string
subject: string
message: string
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
<ContactForm
onSubmit={async (data) => {
try {
await sendContactForm(data)
toast.success('Mensagem enviada com sucesso!')
} catch (error) {
toast.error('Erro ao enviar mensagem')
}
}}
/>
\`\`\`

## 🧪 Testes

Cada componente possui testes unitários e de integração usando Vitest e Testing Library. Os testes cobrem:

- Renderização correta
- Interações do usuário
- Estados de erro
- Acessibilidade
- Responsividade
- Integração com outros componentes

## 📚 Boas Práticas

1. **Acessibilidade**

   - Use ARIA labels apropriados
   - Mantenha a navegação por teclado
   - Forneça feedback visual e textual

2. **Performance**

   - Evite re-renders desnecessários
   - Use React.memo quando apropriado
   - Otimize imagens e assets

3. **Manutenção**

   - Mantenha componentes pequenos e focados
   - Use TypeScript para type safety
   - Documente props e exemplos de uso

4. **Testes**
   - Escreva testes para casos de uso principais
   - Teste edge cases e estados de erro
   - Mantenha cobertura de testes alta
