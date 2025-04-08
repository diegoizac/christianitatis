import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import UserMenu from '../UserMenu'

const AuthStatus = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return <UserMenu />
}

export default AuthStatus
