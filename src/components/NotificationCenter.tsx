import React, { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { notificationService, Notification } from '@/services/notificationService'
import { useNavigate } from 'react-router-dom'

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000) // Atualiza a cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  async function loadNotifications() {
    try {
      const [notifs, count] = await Promise.all([
        notificationService.listNotifications(),
        notificationService.getUnreadCount(),
      ])
      setNotifications(notifs)
      setUnreadCount(count)
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    }
  }

  async function handleNotificationClick(notification: Notification) {
    try {
      await notificationService.markAsRead(notification.id)
      setUnreadCount(prev => Math.max(0, prev - 1))

      if (notification.event_id) {
        navigate(`/events/${notification.event_id}`)
      }

      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error)
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await notificationService.markAllAsRead()
      setUnreadCount(0)
      loadNotifications()
    } catch (error) {
      console.error('Erro ao marcar todas notificações como lidas:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Nenhuma notificação</div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
