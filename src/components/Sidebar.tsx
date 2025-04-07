import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({
    dashboard: false,
    profile: false,
  })
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  const toggleExpand = (section: string) => {
    setIsExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev)
  }

  return (
    <div
      className={`h-full bg-gray-800 text-white flex flex-col ${isSidebarExpanded ? 'w-64' : 'w-20'}`}
    >
      <button onClick={toggleSidebar} className="p-2 focus:outline-none">
        {isSidebarExpanded ? '<<' : '>>'}
      </button>
      {isSidebarExpanded && (
        <>
          <div className="p-4 font-bold text-lg">Menu</div>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => toggleExpand('dashboard')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Dashboard
                </button>
                {isExpanded.dashboard && (
                  <ul className="pl-4 space-y-1">
                    <li>
                      <Link to="/dashboard/overview" className="block px-4 py-2 hover:bg-gray-700">
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/stats" className="block px-4 py-2 hover:bg-gray-700">
                        Stats
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() => toggleExpand('profile')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Profile
                </button>
                {isExpanded.profile && (
                  <ul className="pl-4 space-y-1">
                    <li>
                      <Link to="/profile/settings" className="block px-4 py-2 hover:bg-gray-700">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/security" className="block px-4 py-2 hover:bg-gray-700">
                        Security
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export default Sidebar
