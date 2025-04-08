import React from 'react'
import { Filter } from 'lucide-react'

interface EventFiltersProps {
  statusFilter: string
  setStatusFilter: (status: string) => void
  dateFilter: {
    startDate: string
    endDate: string
  }
  setDateFilter: (filter: { startDate: string; endDate: string }) => void
  onApply: () => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
}

const EventFilters: React.FC<EventFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  onApply,
  showFilters,
  setShowFilters,
}) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-4 py-2 border rounded-full flex items-center gap-2 hover:bg-gray-50"
      >
        <Filter className="h-5 w-5" />
        Filtros
      </button>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Todos</option>
                <option value="active">Ativos</option>
                <option value="finished">Finalizados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={e => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={e => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onApply}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventFilters
