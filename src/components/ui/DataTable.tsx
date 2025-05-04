'use client'

import { ReactNode, useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface Column<T> {
  key: keyof T
  title: string
  render?: (value: any, item: T) => ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  keyExtractor: (item: T) => string
  emptyMessage?: string
}

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
  keyExtractor,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: keyof T) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null
    if (sortConfig?.key !== column.key) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-gold" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-gold" />
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 font-garamond italic">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-verdigris/20">
        <thead>
          <tr className="bg-midnight">
            {columns.map(column => (
              <th
                key={String(column.key)}
                scope="col"
                className={`px-6 py-3 text-left text-sm font-futura tracking-wider text-gold ${
                  column.sortable ? 'cursor-pointer select-none' : ''
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.title}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-verdigris/20">
          {sortedData.map(item => (
            <tr
              key={keyExtractor(item)}
              className={`bg-midnight/50 hover:bg-midnight transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map(column => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 text-sm font-garamond text-gray-200 whitespace-nowrap"
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}