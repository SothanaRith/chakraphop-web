'use client'

import { useMemo, useState } from 'react'

export function DataTable({
  columns,
  data,
  isLoading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  searchableKeys = [],
  enableSearch = true,
  searchPlaceholder = 'Search...',
  enablePagination = true,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
}) {
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const hasSearch = enableSearch && searchableKeys.length > 0

  const filteredData = useMemo(() => {
    if (!hasSearch || !search.trim()) return data || []
    const q = search.trim().toLowerCase()

    return (data || []).filter((row) =>
      searchableKeys.some((key) => String(row?.[key] ?? '').toLowerCase().includes(q))
    )
  }, [data, hasSearch, search, searchableKeys])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    const sorted = [...filteredData]
    sorted.sort((a, b) => {
      const aValue = a?.[sortConfig.key]
      const bValue = b?.[sortConfig.key]

      if (aValue == null) return 1
      if (bValue == null) return -1

      const left = typeof aValue === 'string' ? aValue.toLowerCase() : aValue
      const right = typeof bValue === 'string' ? bValue.toLowerCase() : bValue

      if (left < right) return sortConfig.direction === 'asc' ? -1 : 1
      if (left > right) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sortConfig])

  const totalItems = sortedData.length
  const totalPages = enablePagination ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1

  const pagedData = useMemo(() => {
    if (!enablePagination) return sortedData
    const start = (page - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [enablePagination, page, pageSize, sortedData])

  const requestSort = (key) => {
    setPage(1)
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return { key, direction: 'asc' }
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (isEmpty || !(data || []).length) {
    return (
      <div className="flex justify-center items-center h-64 border border-gray-200 rounded-lg bg-gray-50">
        <div className="text-gray-600">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border-b border-gray-200">
        {hasSearch ? (
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder={searchPlaceholder}
            className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div />
        )}

        {enablePagination && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => {
                const sortable = !col.render
                const isSorted = sortConfig.key === col.key

                return (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    <button
                      type="button"
                      onClick={() => sortable && requestSort(col.key)}
                      className={`inline-flex items-center gap-1 ${sortable ? 'hover:text-blue-700' : 'cursor-default'}`}
                    >
                      <span>{col.label}</span>
                      {sortable && (
                        <span className="text-[10px]">
                          {isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      )}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 text-sm text-gray-700">
          <p>
            Showing {totalItems === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalItems)} of {totalItems}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
