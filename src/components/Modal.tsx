import React, { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ id, isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} id={id}>
      <div
        className="modal-content relative max-w-4xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
        ref={modalRef}
      >
        <button className="modal-close" onClick={onClose}>
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default Modal
