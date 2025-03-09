import React, { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

const AppSection = () => {
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

    const element = document.getElementById('app-section');
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
    "Send and receive money instantly",
    "Pay bills and subscriptions",
    "Track your spending with detailed analytics",
    "Create savings goals and track progress",
    "Secure authentication with biometrics",
    "24/7 customer support"
  ];

  return (
    <div id="app-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl font-bold mb-6">
              Download Our App
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the full power of Christianitatis with our mobile app. Available for iOS and Android devices.
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className={`flex items-center transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                  <span className="bg-white bg-opacity-20 p-1 rounded-full mr-3">
                    <Check className="h-5 w-5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4">
              <a href="#" className="app-store-button flex items-center px-6 py-3 rounded-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="h-8 mr-3" />
                <div>
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>
              
              <a href="#" className="app-store-button flex items-center px-6 py-3 rounded-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" className="h-8 mr-3" />
                <div>
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          
          <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-xl opacity-50 animate-pulse-slow"></div>
              <img 
                src="https://cdn.dribbble.com/users/1615584/screenshots/16471085/media/a7b971a9e21008597e0f2e843f6a298a.jpg?compress=1&resize=800x600" 
                alt="Mobile App" 
                className="relative z-10 rounded-3xl shadow-2xl max-w-full animate-float" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppSection
