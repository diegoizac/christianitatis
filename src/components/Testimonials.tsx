import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('testimonials-section')
    if (element) {
      observer.observe(element)
    }

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
      clearInterval(interval)
    }
  }, [])

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      content:
        'Christianitatis has completely transformed how I manage my business finances. The app is intuitive and the customer service is exceptional.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      content:
        'As a freelancer working with international clients, Christianitatis makes it easy to receive payments from anywhere in the world.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Digital Nomad',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      content:
        'I travel constantly and Christianitatis has been a game-changer. The multi-currency feature saves me so much money on exchange rates.',
      rating: 4,
    },
  ]

  return (
    <div id="testimonials-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            What Our Users Say
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Join thousands of satisfied users who have simplified their financial lives.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-red-500 w-6' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
