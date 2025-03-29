# Internacionalização do Christianitatis

## 🌐 Configuração i18n

### Setup

Configuração inicial do i18n.

\`\`\`typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';
import esES from './locales/es-ES';
import laLA from './locales/la-LA';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
resources: {
'pt-BR': ptBR,
'en-US': enUS,
'es-ES': esES,
'la-LA': laLA
},
fallbackLng: 'pt-BR',
interpolation: {
escapeValue: false
}
});

export default i18n;
\`\`\`

## 📝 Arquivos de Tradução

### Português (Brasil)

\`\`\`typescript
// src/i18n/locales/pt-BR.ts
export default {
translation: {
header: {
home: 'Início',
about: 'Sobre',
events: 'Eventos',
contact: 'Contato'
},
footer: {
rights: 'Todos os direitos reservados',
privacy: 'Política de Privacidade',
terms: 'Termos de Uso'
},
contact: {
title: 'Entre em Contato',
name: 'Nome',
email: 'Email',
phone: 'Telefone',
message: 'Mensagem',
send: 'Enviar',
success: 'Mensagem enviada com sucesso!',
error: 'Erro ao enviar mensagem'
},
events: {
upcoming: 'Próximos Eventos',
past: 'Eventos Passados',
location: 'Local',
time: 'Horário',
info: 'Informações'
},
validation: {
required: 'Campo obrigatório',
invalidEmail: 'Email inválido',
invalidPhone: 'Telefone inválido'
}
}
};
\`\`\`

### English (US)

\`\`\`typescript
// src/i18n/locales/en-US.ts
export default {
translation: {
header: {
home: 'Home',
about: 'About',
events: 'Events',
contact: 'Contact'
},
footer: {
rights: 'All rights reserved',
privacy: 'Privacy Policy',
terms: 'Terms of Use'
},
contact: {
title: 'Contact Us',
name: 'Name',
email: 'Email',
phone: 'Phone',
message: 'Message',
send: 'Send',
success: 'Message sent successfully!',
error: 'Error sending message'
},
events: {
upcoming: 'Upcoming Events',
past: 'Past Events',
location: 'Location',
time: 'Time',
info: 'Information'
},
validation: {
required: 'Required field',
invalidEmail: 'Invalid email',
invalidPhone: 'Invalid phone'
}
}
};
\`\`\`

### Español (España)

\`\`\`typescript
// src/i18n/locales/es-ES.ts
export default {
translation: {
header: {
home: 'Inicio',
about: 'Sobre',
events: 'Eventos',
contact: 'Contacto'
},
footer: {
rights: 'Todos los derechos reservados',
privacy: 'Política de Privacidad',
terms: 'Términos de Uso'
},
contact: {
title: 'Contáctenos',
name: 'Nombre',
email: 'Correo',
phone: 'Teléfono',
message: 'Mensaje',
send: 'Enviar',
success: '¡Mensaje enviado con éxito!',
error: 'Error al enviar mensaje'
},
events: {
upcoming: 'Próximos Eventos',
past: 'Eventos Pasados',
location: 'Ubicación',
time: 'Hora',
info: 'Información'
},
validation: {
required: 'Campo requerido',
invalidEmail: 'Correo inválido',
invalidPhone: 'Teléfono inválido'
}
}
};
\`\`\`

### Latin

\`\`\`typescript
// src/i18n/locales/la-LA.ts
export default {
translation: {
header: {
home: 'Domus',
about: 'De Nobis',
events: 'Eventus',
contact: 'Contactus'
},
footer: {
rights: 'Omnia iura reservata',
privacy: 'Politica Privationis',
terms: 'Termini Usus'
},
contact: {
title: 'Contacta Nos',
name: 'Nomen',
email: 'Litterae Electronicae',
phone: 'Telephonum',
message: 'Nuntius',
send: 'Mittere',
success: 'Nuntius feliciter missus!',
error: 'Error in mittendo nuntio'
},
events: {
upcoming: 'Eventus Futuri',
past: 'Eventus Praeteriti',
location: 'Locus',
time: 'Tempus',
info: 'Informationes'
},
validation: {
required: 'Campus necessarius',
invalidEmail: 'Litterae electronicae invalidae',
invalidPhone: 'Telephonum invalidum'
}
}
};
\`\`\`

## 🔧 Uso nos Componentes

### Hook useTranslation

\`\`\`typescript
// src/components/Header.tsx
import { useTranslation } from 'react-i18next';

const Header = () => {
const { t } = useTranslation();

return (
<header>
<nav>
<a href="/">{t('header.home')}</a>
<a href="/about">{t('header.about')}</a>
<a href="/events">{t('header.events')}</a>
<a href="/contact">{t('header.contact')}</a>
</nav>
</header>
);
};
\`\`\`

### Troca de Idioma

\`\`\`typescript
// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
const { i18n } = useTranslation();

const changeLanguage = (lng: string) => {
i18n.changeLanguage(lng);
};

return (
<div>
<button onClick={() => changeLanguage('pt-BR')}>PT</button>
<button onClick={() => changeLanguage('en-US')}>EN</button>
<button onClick={() => changeLanguage('es-ES')}>ES</button>
<button onClick={() => changeLanguage('la-LA')}>LA</button>
</div>
);
};
\`\`\`

### Formatação de Data

\`\`\`typescript
// src/components/EventDate.tsx
import { useTranslation } from 'react-i18next';

const EventDate = ({ date }: { date: Date }) => {
const { i18n } = useTranslation();

return (
<time>
{date.toLocaleDateString(i18n.language, {
day: 'numeric',
month: 'long',
year: 'numeric'
})}
</time>
);
};
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Mantenha chaves de tradução organizadas
   - Use namespaces para separar contextos
   - Mantenha consistência entre idiomas

2. **Performance**

   - Carregue traduções sob demanda
   - Use cache de traduções
   - Otimize bundles por idioma

3. **Manutenção**

   - Mantenha documentação atualizada
   - Use ferramentas de extração de chaves
   - Implemente processo de revisão

4. **Validação**

   - Verifique chaves ausentes
   - Valide formatação de strings
   - Teste em todos os idiomas

5. **UX**
   - Persista preferência de idioma
   - Forneça fallback adequado
   - Mantenha feedback visual

## 📚 Exemplos

### Interpolação

\`\`\`typescript
// Arquivo de tradução
{
"welcome": "Olá, {{name}}!"
}

// Componente
const Welcome = ({ name }) => {
const { t } = useTranslation();
return <h1>{t('welcome', { name })}</h1>;
};
\`\`\`

### Pluralização

\`\`\`typescript
// Arquivo de tradução
{
"events": {
"count": "{{count}} evento",
"count_plural": "{{count}} eventos"
}
}

// Componente
const EventCount = ({ count }) => {
const { t } = useTranslation();
return <p>{t('events.count', { count })}</p>;
};
\`\`\`

### Formatação de Números

\`\`\`typescript
// Componente
const Price = ({ value }) => {
const { i18n } = useTranslation();

return (
<span>
{new Intl.NumberFormat(i18n.language, {
style: 'currency',
currency: 'BRL'
}).format(value)}
</span>
);
};
\`\`\`

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**

   ```
   Adicionar Chave -> Traduzir -> Testar -> Revisar
   ```

2. **Atualização**

   ```
   Extrair Chaves -> Traduzir Novas -> Validar -> Deploy
   ```

3. **Manutenção**
   ```
   Verificar Missing -> Atualizar -> Testar -> Commit
   ```
