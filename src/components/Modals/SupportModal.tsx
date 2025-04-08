import React from 'react'
import pixQRCode from '@/assets/images/PIX-Christianitatis.png'

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl font-medium leading-6 text-gray-900 mb-6 text-center">
                  Apoie o Movimento
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-6 text-center">
                    Você pode apoiar o movimento Christianitatis de várias formas:
                  </p>

                  {/* Seção do PIX ocupando toda a largura */}
                  <div className="mb-8">
                    <h4 className="text-gray-800 font-medium mb-4 text-xl text-center">
                      Doação via PIX
                    </h4>
                    <div className="flex flex-col items-center gap-4">
                      <img src={pixQRCode} alt="QR Code PIX" className="w-64 h-64 object-contain" />
                      <p className="text-gray-600 text-lg">
                        Chave PIX: <strong>christianitatis@gmail.com</strong>
                      </p>
                    </div>
                  </div>

                  {/* Grid com duas colunas para as outras informações */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-gray-800 font-medium mb-4 text-xl">
                        Transferência Bancária
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600">
                          <span className="font-medium">Banco:</span> Nubank
                          <br />
                          <span className="font-medium">Agência:</span> 0001
                          <br />
                          <span className="font-medium">Conta:</span> 00000000-0
                          <br />
                          <span className="font-medium">Nome:</span> Christianitatis
                          <br />
                          <span className="font-medium">CNPJ:</span> 00.000.000/0001-00
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-800 font-medium mb-4 text-xl">
                        Outras Formas de Apoio
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Compartilhe nosso conteúdo nas redes sociais</li>
                        <li>Participe dos nossos eventos</li>
                        <li>Divulgue nossa missão</li>
                        <li>Ore por nossa causa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportModal
