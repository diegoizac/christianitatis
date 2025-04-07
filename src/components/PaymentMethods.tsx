import React from 'react'

const PaymentMethods = () => {
  const paymentMethods = [
    { name: 'PIX', logo: '/payment-icons/pix.svg' },
    { name: 'Visa', logo: '/payment-icons/visa.svg' },
    { name: 'Mastercard', logo: '/payment-icons/mastercard.svg' },
    { name: 'Boleto', logo: '/payment-icons/boleto.svg' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {paymentMethods.map((method, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-center h-16 hover:border-blue-500 transition-colors"
        >
          <img src={method.logo} alt={method.name} className="max-h-8 max-w-full" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

export default PaymentMethods
