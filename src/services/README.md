# Serviços do Christianitatis

## 🔌 Serviços de API

### Supabase

Serviço para interação com o Supabase.

\`\`\`typescript
import { supabase } from '../config/supabaseClient';

// Exemplo de uso
const { data, error } = await supabase
.from('contacts')
.insert([{ name, email, phone, message }]);
\`\`\`

#### Métodos Disponíveis

1. **insertContact**

   ```typescript
   const insertContact = async (contact: ContactFormData) => {
     const { data, error } = await supabase.from("contacts").insert([contact]);

     if (error) throw error;
     return data;
   };
   ```

2. **getEvents**

   ```typescript
   const getEvents = async () => {
     const { data, error } = await supabase
       .from("events")
       .select("*")
       .order("date", { ascending: true });

     if (error) throw error;
     return data;
   };
   ```

3. **updateEvent**
   ```typescript
   const updateEvent = async (id: string, event: Partial<Event>) => {
     const { data, error } = await supabase
       .from("events")
       .update(event)
       .match({ id });

     if (error) throw error;
     return data;
   };
   ```

## 📧 Serviços de Email

### EmailService

Serviço para envio de emails.

\`\`\`typescript
import { sendEmail } from '../services/emailService';

// Exemplo de uso
await sendEmail({
to: 'contato@christianitatis.com',
subject: 'Novo Contato',
body: 'Detalhes do contato...'
});
\`\`\`

#### Métodos Disponíveis

1. **sendEmail**

   ```typescript
   const sendEmail = async (params: EmailParams) => {
     const { to, subject, body } = params;
     // Implementação do envio de email
   };
   ```

2. **sendContactNotification**
   ```typescript
   const sendContactNotification = async (contact: ContactFormData) => {
     const body = generateEmailBody(contact);
     return sendEmail({
       to: process.env.NOTIFICATION_EMAIL,
       subject: "Novo Contato via Site",
       body,
     });
   };
   ```

## 🔒 Serviços de Autenticação

### AuthService

Serviço para autenticação com Supabase.

\`\`\`typescript
import { signIn, signOut } from '../services/authService';

// Exemplo de uso
await signIn(email, password);
\`\`\`

#### Métodos Disponíveis

1. **signIn**

   ```typescript
   const signIn = async (email: string, password: string) => {
     const { user, error } = await supabase.auth.signIn({
       email,
       password,
     });

     if (error) throw error;
     return user;
   };
   ```

2. **signOut**
   ```typescript
   const signOut = async () => {
     const { error } = await supabase.auth.signOut();
     if (error) throw error;
   };
   ```

## 🎥 Serviços de Mídia

### MediaService

Serviço para manipulação de mídia.

\`\`\`typescript
import { uploadImage, uploadVideo } from '../services/mediaService';

// Exemplo de uso
const imageUrl = await uploadImage(file);
\`\`\`

#### Métodos Disponíveis

1. **uploadImage**

   ```typescript
   const uploadImage = async (file: File) => {
     const { data, error } = await supabase.storage
       .from('images')
       .upload(\`events/\${Date.now()}-\${file.name}\`, file);

     if (error) throw error;
     return data.publicUrl;
   };
   ```

2. **uploadVideo**
   ```typescript
   const uploadVideo = async (file: File) => {
     const { data, error } = await supabase.storage
       .from('videos')
       .upload(\`events/\${Date.now()}-\${file.name}\`, file);

     if (error) throw error;
     return data.publicUrl;
   };
   ```

## 🔧 Boas Práticas

1. **Tratamento de Erros**

   - Use try/catch em todas as chamadas de serviço
   - Retorne tipos de erro específicos
   - Mantenha mensagens de erro consistentes

2. **Cache**

   - Implemente cache para dados frequentemente acessados
   - Use invalidação de cache apropriada
   - Considere TTL para dados dinâmicos

3. **Logging**

   - Registre erros e eventos importantes
   - Use níveis de log apropriados
   - Mantenha informações sensíveis seguras

4. **Performance**

   - Otimize consultas ao banco
   - Use batch operations quando possível
   - Implemente rate limiting

5. **Segurança**
   - Valide inputs
   - Use HTTPS
   - Implemente autenticação e autorização

## 📚 Exemplos de Uso

### Fluxo de Contato Completo

\`\`\`typescript
import { insertContact } from '../services/supabaseService';
import { sendContactNotification } from '../services/emailService';

const handleContact = async (formData: ContactFormData) => {
try {
// Insere no banco
await insertContact(formData);

    // Envia notificação
    await sendContactNotification(formData);

    return { success: true };

} catch (error) {
console.error('Erro ao processar contato:', error);
throw error;
}
};
\`\`\`

### Upload de Mídia para Evento

\`\`\`typescript
import { uploadImage, uploadVideo } from '../services/mediaService';
import { updateEvent } from '../services/supabaseService';

const handleEventMedia = async (eventId: string, image: File, video?: File) => {
try {
// Upload da imagem
const imageUrl = await uploadImage(image);

    // Upload do vídeo (se existir)
    let videoUrl;
    if (video) {
      videoUrl = await uploadVideo(video);
    }

    // Atualiza evento
    await updateEvent(eventId, { imageUrl, videoUrl });

    return { success: true };

} catch (error) {
console.error('Erro ao processar mídia:', error);
throw error;
}
};
\`\`\`

## 🔄 Fluxo de Dados

1. **Contato**

   ```
   Form -> Validação -> Supabase -> Email -> Resposta
   ```

2. **Upload de Mídia**

   ```
   Arquivo -> Validação -> Storage -> Banco -> URL
   ```

3. **Autenticação**
   ```
   Credenciais -> Validação -> Supabase Auth -> Token -> Storage
   ```
