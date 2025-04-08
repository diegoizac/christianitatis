import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'
import { toast } from 'react-toastify'

interface Evento {
  id: string
  titulo: string
  descricao: string
  data: string
  local: string
  tipo: string
  vagas: number
  inscritos: number
  organizador: string
  contato: string
  requisitos: string[]
  materiais: string[]
}

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [evento, setEvento] = useState<Evento | null>(null)
  const [loading, setLoading] = useState(true)
  const [inscrito, setInscrito] = useState(false)

  useEffect(() => {
    fetchEvento()
    if (user) {
      checkInscricao()
    }
  }, [id, user])

  const fetchEvento = async () => {
    try {
      const { data, error } = await supabase.from('eventos').select('*').eq('id', id).single()

      if (error) throw error
      setEvento(data)
    } catch (error) {
      toast.error('Erro ao carregar detalhes do evento')
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const checkInscricao = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos_inscritos')
        .select('*')
        .eq('evento_id', id)
        .eq('user_id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setInscrito(!!data)
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error)
    }
  }

  const handleInscrever = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para se inscrever')
      return
    }

    try {
      const { error } = await supabase.from('eventos_inscritos').insert({
        evento_id: id,
        user_id: user.id,
      })

      if (error) throw error

      toast.success('Inscrição realizada com sucesso!')
      setInscrito(true)
      fetchEvento() // Atualiza o número de inscritos
    } catch (error) {
      toast.error('Erro ao realizar inscrição')
    }
  }

  const handleCancelarInscricao = async () => {
    try {
      const { error } = await supabase
        .from('eventos_inscritos')
        .delete()
        .eq('evento_id', id)
        .eq('user_id', user?.id)

      if (error) throw error

      toast.success('Inscrição cancelada com sucesso!')
      setInscrito(false)
      fetchEvento() // Atualiza o número de inscritos
    } catch (error) {
      toast.error('Erro ao cancelar inscrição')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando detalhes do evento...</p>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Evento não encontrado</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{evento.titulo}</h1>
          <p className="text-gray-600 mb-6">{evento.descricao}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informações do Evento</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">Data:</span>{' '}
                  {new Date(evento.data).toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <span className="font-medium">Local:</span> {evento.local}
                </p>
                <p>
                  <span className="font-medium">Tipo:</span> {evento.tipo}
                </p>
                <p>
                  <span className="font-medium">Vagas disponíveis:</span>{' '}
                  {evento.vagas - evento.inscritos}
                </p>
                <p>
                  <span className="font-medium">Organizador:</span> {evento.organizador}
                </p>
                <p>
                  <span className="font-medium">Contato:</span> {evento.contato}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Requisitos e Materiais</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Requisitos:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {evento.requisitos?.map((req, index) => (
                      <li key={index} className="text-gray-600">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Materiais Necessários:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {evento.materiais?.map((material, index) => (
                      <li key={index} className="text-gray-600">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate('/events')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Voltar
            </button>
            {inscrito ? (
              <button
                onClick={handleCancelarInscricao}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar Inscrição
              </button>
            ) : (
              <button
                onClick={handleInscrever}
                disabled={evento.vagas <= evento.inscritos}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {evento.vagas <= evento.inscritos ? 'Esgotado' : 'Inscrever-se'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
