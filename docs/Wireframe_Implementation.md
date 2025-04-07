# 📋 Implementação do Wireframe - Christianitatis

## 🌳 Estrutura Principal

O site Christianitatis é estruturado em três áreas principais:

1. **Menu Superior**
2. **Árvore 3D Central**
3. **Rodapé**

## 🔝 Menu Superior

### Componentes

```typescript
interface HeaderProps {
  isScrolled: boolean;
  setActiveModal: (modalId: string | null) => void;
}

const menuItems = [
  {
    id: "eventos",
    label: "Eventos",
    icon: "🗓️",
    modalId: "eventos-modal",
  },
  {
    id: "biblia",
    label: "Bíblia Online",
    icon: "📖",
    href: "/biblia",
  },
  {
    id: "media",
    label: "Videocast/Podcast",
    icon: "🎥",
    links: {
      youtube: "URL_DO_YOUTUBE",
      spotify: "URL_DO_SPOTIFY",
    },
  },
  {
    id: "faq",
    label: "FAQ",
    icon: "❓",
    modalId: "faq-modal",
  },
  {
    id: "forum",
    label: "Fórum",
    icon: "💬",
    modalId: "forum-modal",
  },
  {
    id: "contato",
    label: "Fale Conosco",
    icon: "✉️",
    modalId: "contato-modal",
  },
];
```

## 🎯 Esferas da Árvore

### 1. Esfera Vermelha (Igreja no Lar)

```typescript
interface ChurchHomeContent {
  title: string;
  description: string;
  videos: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
  }[];
}

const churchHomeConfig: ChurchHomeContent = {
  title: "Comece uma Reunião Bíblica",
  description: `
    Aprenda sobre:
    - O que é uma Igreja
    - O que é uma Igreja no Lar
  `,
  videos: Array(7)
    .fill(null)
    .map((_, i) => ({
      id: `video-${i}`,
      title: `Vídeo ${i + 1}`,
      url: `URL_DO_VIDEO_${i + 1}`,
      thumbnail: `URL_DA_THUMBNAIL_${i + 1}`,
    })),
};
```

### 2. Esfera Preta (Encontre uma Igreja)

```typescript
interface ChurchFinderContent {
  title: string;
  filters: {
    country: string[];
    state: string[];
    city: string[];
    neighborhood: string[];
  };
  hostInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
    chat: boolean;
  };
}

const churchFinderConfig: ChurchFinderContent = {
  title: "Encontre uma Igreja no Lar",
  filters: {
    country: ["Brasil", "Portugal", "EUA"],
    state: [], // Preenchido dinamicamente
    city: [], // Preenchido dinamicamente
    neighborhood: [], // Preenchido dinamicamente
  },
  hostInfo: {
    name: "",
    address: "",
    email: "",
    phone: "",
    chat: true,
  },
};
```

### 3. Esfera Azul (Cadastre uma Igreja)

```typescript
interface ChurchRegistrationContent {
  title: string;
  form: {
    personal: {
      name: string;
      email: string;
      phone: string;
    };
    church: {
      name: string;
      address: string;
      schedule: {
        date: Date;
        time: string;
        frequency: "weekly" | "biweekly" | "monthly";
      };
      vacation: {
        start: Date;
        end: Date;
      };
    };
  };
}
```

### 4. Esfera Amarela (Apoie o Movimento)

```typescript
interface SupportContent {
  title: string;
  description: string;
  paymentMethods: {
    bank: {
      name: string;
      account: string;
      branch: string;
    };
    pix: {
      key: string;
      qrCode: string;
    };
    international: {
      swiftCode: string;
      iban: string;
    };
    card: {
      types: ("credit" | "debit")[];
      processors: string[];
    };
  };
}
```

### 5. Esfera Verde (Quem Somos)

```typescript
interface AboutContent {
  title: string;
  mission: string;
  values: string[];
}
```

## 📱 Responsividade

### Breakpoints

```typescript
const breakpoints = {
  mobile: {
    max: "767px",
    layout: "vertical",
  },
  tablet: {
    min: "768px",
    max: "1023px",
    layout: "hybrid",
  },
  desktop: {
    min: "1024px",
    layout: "3d",
  },
};
```

### Adaptações Mobile

```typescript
const MobileLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <NavigationCards /> {/* Versão em cards das esferas */}
      <Footer />
    </div>
  );
};

const NavigationCards = () => {
  return sphereConfigs.map((config) => (
    <Card
      key={config.id}
      color={config.color}
      title={config.title}
      onClick={() => handleNavigation(config.id)}
    />
  ));
};
```

## 🎨 Temas e Estilos

### Cores

```typescript
const colors = {
  spheres: {
    red: "#FF0000",
    black: "#000000",
    blue: "#0000FF",
    yellow: "#FFFF00",
    green: "#00FF00",
  },
  ui: {
    primary: "#1a1a1a",
    secondary: "#333333",
    accent: "#4a90e2",
    text: "#ffffff",
    background: "#000000",
  },
};
```

### Tipografia

```typescript
const typography = {
  fontFamily: {
    primary: "Inter, sans-serif",
    secondary: "Roboto, sans-serif",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
};
```

## 🔄 Fluxos de Navegação

### 1. Fluxo de Cadastro de Igreja

```typescript
const churchRegistrationFlow = {
  steps: [
    {
      id: "personal",
      title: "Dados Pessoais",
      fields: ["name", "email", "phone"],
    },
    {
      id: "church",
      title: "Dados da Igreja",
      fields: ["name", "address"],
    },
    {
      id: "schedule",
      title: "Horários",
      fields: ["date", "time", "frequency"],
    },
    {
      id: "confirmation",
      title: "Confirmação",
      type: "review",
    },
  ],
};
```

### 2. Fluxo de Busca de Igreja

```typescript
const churchSearchFlow = {
  steps: [
    {
      id: "location",
      title: "Localização",
      type: "map",
    },
    {
      id: "filters",
      title: "Filtros",
      fields: ["country", "state", "city", "neighborhood"],
    },
    {
      id: "results",
      title: "Resultados",
      type: "list",
    },
    {
      id: "details",
      title: "Detalhes",
      type: "modal",
    },
  ],
};
```

## 🔒 Segurança e LGPD

### Dados Sensíveis

```typescript
const sensitiveData = {
  personal: ["name", "email", "phone", "address"],
  church: ["address", "schedule"],
  host: ["name", "phone", "email"],
};

const privacySettings = {
  dataRetention: "2 years",
  encryption: true,
  anonymization: true,
  userConsent: true,
};
```

## 📈 Analytics

### Eventos Rastreados

```typescript
const analyticsEvents = {
  navigation: ["sphere_click", "menu_click", "modal_open", "modal_close"],
  interaction: [
    "form_start",
    "form_complete",
    "search_perform",
    "video_play",
    "donation_start",
    "donation_complete",
  ],
  error: ["form_error", "payment_error", "search_error", "video_error"],
};
```

## 🎯 Próximos Passos

1. **Implementação Inicial**

   - Setup da estrutura base
   - Implementação do Three.js
   - Componentes básicos

2. **Features por Esfera**

   - Sistema de vídeos
   - Geolocalização
   - Sistema de cadastro
   - Gateway de pagamentos
   - CMS para conteúdo

3. **Otimizações**

   - Performance
   - SEO
   - Acessibilidade
   - Analytics

4. **Testes e QA**
   - Testes unitários
   - Testes E2E
   - Testes de usabilidade
   - Validação LGPD
