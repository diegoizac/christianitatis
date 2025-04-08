import type { DatabaseTables } from '@/lib/supabase'

type Event = DatabaseTables['events']['Row']

export const events: Event[] = [
  {
    id: "1",
    title: "Workshop de Oração",
    date: "24 Mar 2024",
    time: "09:00 - 12:00",
    location: {
      address: "Rua Principal, 123",
      city: "São Paulo",
      state: "SP",
      coordinates: {
        lat: -23.550520,
        lng: -46.633308
      }
    },
    description:
      "Um workshop para aprender mais sobre a oração e sua importância na vida cristã. Venha descobrir como aprofundar sua conexão espiritual através da oração contemplativa e meditativa.",
    media: {
      images: [{
        url: "/images/nick-belem.png",
        size: 1024,
        format: "png",
        name: "workshop-oracao.png"
      }],
      videos: []
    },
    capacity: 50,
    registered_count: 0,
    price: 0,
    contact: {
      name: "Pe. João",
      email: "pe.joao@christianitatis.org",
      phone: "(11) 99999-9999"
    },
    status: "published",
    approvedBy: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Retiro Espiritual",
    date: "15-17 Abr 2024",
    time: "Todo o dia",
    location: {
      address: "Casa de Retiros Santa Clara, Rua das Flores, 456",
      city: "Campos do Jordão",
      state: "SP",
      coordinates: {
        lat: -22.739759,
        lng: -45.591759
      }
    },
    description:
      "Um fim de semana de renovação espiritual e conexão com Deus. Três dias de reflexão, oração e comunhão em um ambiente tranquilo e acolhedor.",
    media: {
      images: [{
        url: "/images/banner-nick-belem.png",
        size: 1024,
        format: "png",
        name: "retiro-espiritual.png"
      }],
      videos: []
    },
    capacity: 100,
    registered_count: 0,
    price: 350,
    contact: {
      name: "Maria",
      email: "maria@christianitatis.org",
      phone: "(11) 88888-8888"
    },
    status: "published",
    approvedBy: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Encontro de Jovens",
    date: "30 Mar 2024",
    time: "19:00 - 22:00",
    location: {
      address: "Salão Paroquial, Av. Principal, 789",
      city: "Rio de Janeiro",
      state: "RJ",
      coordinates: {
        lat: -22.906847,
        lng: -43.172897
      }
    },
    description:
      "Uma noite especial para jovens com música, dinâmicas e momentos de partilha. Uma oportunidade de encontrar outros jovens e fortalecer sua fé.",
    media: {
      images: [{
        url: "/images/nick-brasilia.png",
        size: 1024,
        format: "png",
        name: "encontro-jovens.png"
      }],
      videos: []
    },
    capacity: 150,
    registered_count: 0,
    price: 0,
    contact: {
      name: "Lucas",
      email: "lucas@christianitatis.org",
      phone: "(21) 77777-7777"
    },
    status: "published",
    approvedBy: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    title: "Missa de Páscoa",
    date: "31 Mar 2024",
    time: "10:00 - 11:30",
    location: {
      address: "Igreja Matriz, Praça da Matriz, 1",
      city: "São Paulo",
      state: "SP",
      coordinates: {
        lat: -23.550520,
        lng: -46.633308
      }
    },
    description: "Celebração solene da Páscoa, comemorando a ressurreição de Cristo. Um momento de alegria e renovação da nossa fé.",
    media: {
      images: [{
        url: "/images/nick-goiania.png",
        size: 1024,
        format: "png",
        name: "missa-pascoa.png"
      }],
      videos: []
    },
    capacity: 300,
    registered_count: 0,
    price: 0,
    contact: {
      name: "Secretaria Paroquial",
      email: "secretaria@christianitatis.org",
      phone: "(11) 3333-3333"
    },
    status: "published",
    approvedBy: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];
