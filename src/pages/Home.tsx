import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import LeftMenu from '../components/LeftMenu'
import Animation from '../components/Animation'

interface HomeProps {
  activeModal: string | null
  setActiveModal: (modal: string | null) => void
}

const Home: React.FC<HomeProps> = ({ activeModal, setActiveModal }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenAuth = () => {
    setActiveModal('auth')
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="relative z-10">
        <Header
          isScrolled={isScrolled}
          setActiveModal={setActiveModal}
          onOpenAuth={handleOpenAuth}
        />
        <LeftMenu setActiveModal={setActiveModal} />
      </div>
      <div className="absolute inset-0">
        <Animation />
      </div>
    </div>
  )
}

export default Home
