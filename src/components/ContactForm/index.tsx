import { useState } from 'react'
import { Form } from '../Form'
import { TextInput, Select, Textarea } from '../Input'
import { Button } from '../Button'
import { FaUser, FaEnvelope, FaPhone, FaTag, FaComment } from 'react-icons/fa'

export type ContactFormData = Record<string, string> & {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
}

const formConfig = {
  initialValues: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  },
  validationRules: {
    name: {
      required: 'Nome é obrigatório',
    },
    email: {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email inválido',
      },
    },
    message: {
      required: 'Mensagem é obrigatória',
    },
  },
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setIsLoading(true)
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Entre em Contato</h2>
      <p className="text-gray-600 mb-8">
        Preencha o formulário abaixo e entraremos em contato o mais breve possível.
      </p>

      <Form<ContactFormData> config={formConfig} onSubmit={handleSubmit} className="space-y-6">
        {({ values, errors, handleChange }) => (
          <>
            <TextInput
              name="name"
              label="Nome Completo"
              placeholder="Seu nome completo"
              value={values.name}
              error={errors.name}
              onChange={e => handleChange('name', e.target.value)}
              required
              leftIcon={<FaUser />}
            />

            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={values.email}
              error={errors.email}
              onChange={e => handleChange('email', e.target.value)}
              required
              leftIcon={<FaEnvelope />}
            />

            <TextInput
              name="phone"
              type="tel"
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={values.phone}
              error={errors.phone}
              onChange={e => handleChange('phone', e.target.value)}
              leftIcon={<FaPhone />}
            />

            <Select
              name="subject"
              label="Assunto"
              value={values.subject}
              error={errors.subject}
              onChange={e => handleChange('subject', e.target.value)}
              leftIcon={<FaTag />}
            >
              <option value="">Selecione um assunto</option>
              <option value="eventos">Eventos</option>
              <option value="duvidas">Dúvidas</option>
              <option value="sugestoes">Sugestões</option>
              <option value="outros">Outros</option>
            </Select>

            <Textarea
              name="message"
              label="Mensagem"
              placeholder="Digite sua mensagem aqui..."
              value={values.message}
              error={errors.message}
              onChange={e => handleChange('message', e.target.value)}
              rows={4}
              required
              leftIcon={<FaComment />}
            />

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
              Enviar Mensagem
            </Button>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Você também pode nos contatar através de:
              </p>
              <div className="mt-4 flex justify-center space-x-6">
                <a
                  href="mailto:contato@christianitatis.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaEnvelope className="inline mr-2" />
                  contato@christianitatis.com
                </a>
                <a
                  href="tel:+5511999999999"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaPhone className="inline mr-2" />
                  (11) 99999-9999
                </a>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}
