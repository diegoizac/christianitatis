import { events } from '../../data/events'
import { Button } from '../ui/button'

const EventsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Próximos Eventos
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Participe dos nossos eventos e fortaleça sua fé através de momentos especiais de
              oração, reflexão e comunhão.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-1"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.location} - {event.address}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Horário: {event.time}</p>
                  {event.theme && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.theme}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Informações: {event.info}
                  </p>
                  {event.partners && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.partners.map((partner, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <Button className={event.isFree ? 'bg-green-600 hover:bg-green-700' : ''}>
                    {event.isFree ? 'Entrada Gratuita' : 'Saiba Mais'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsSection
