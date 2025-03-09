import React, { useEffect, useState } from 'react'
import { CreditCard, Smartphone, Globe, Shield } from 'lucide-react'

const Features = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const features = [
    {
      icon: <CreditCard className="h-10 w-10 text-red-500" />,
      title: "Multiple Payment Methods",
      description: "Connect your cards, bank accounts, and other payment methods to your account."
    },
    {
      icon: <Smartphone className="h-10 w-10 text-red-500" />,
      title: "Mobile First",
      description: "Manage your finances on the go with our powerful mobile application."
    },
    {
      icon: <Globe className="h-10 w-10 text-red-500" />,
      title: "Global Coverage",
      description: "Send and receive money worldwide with competitive exchange rates."
    },
    {
      icon: <Shield className="h-10 w-10 text-red-500" />,
      title: "Secure Transactions",
      description: "Your security is our priority with advanced encryption and authentication."
    }
  ];

  return (
    <div id="features-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            All Your Financial Needs in One Place
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Simplify your financial life with our comprehensive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="mb-4 p-3 bg-red-50 inline-block rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
