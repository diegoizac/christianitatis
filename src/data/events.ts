interface Event {
  imageUrl: string
  title: string
  location: string
  address: string
  time: string
  info: string
  theme?: string
  videoUrl?: string
  isFree?: boolean
  partners?: string[]
}

export const events: Event[] = [
  {
    imageUrl: './assets/images/Nick-Vujicic-Em-Belo-Horizonte.jpg',
    title: '18 ABRIL - Belo Horizonte',
    location: 'Igreja Batista Getsêmani',
    address: 'Belo Horizonte, MG',
    time: '19:00',
    info: '(31) 3448-9898',
    theme: 'Um encontro para inspirar e transformar. FÉ, SUPERAÇÃO E PROPÓSITO.',
    isFree: true,
    partners: ['Nick V Ministries', 'Igreja Batista Getsêmani'],
  },
  // Adicione mais eventos conforme necessário
]
