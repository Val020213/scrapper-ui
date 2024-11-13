'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

// Sample data for the grid
const initialData = [
  {
    id: 1,
    node: 'Node_001',
    status: 'ONLINE',
    latency: 23,
    lastSync: '2023-11-10 15:30:22',
  },
  {
    id: 2,
    node: 'Node_002',
    status: 'OFFLINE',
    latency: 0,
    lastSync: '2023-11-10 14:45:17',
  },
  {
    id: 3,
    node: 'Node_003',
    status: 'ONLINE',
    latency: 45,
    lastSync: '2023-11-10 15:29:58',
  },
  {
    id: 4,
    node: 'Node_004',
    status: 'DEGRADED',
    latency: 132,
    lastSync: '2023-11-10 15:28:03',
  },
  {
    id: 5,
    node: 'Node_005',
    status: 'ONLINE',
    latency: 18,
    lastSync: '2023-11-10 15:30:11',
  },
]

export default function Component() {
  const [data, setData] = useState(initialData)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = React.useMemo(() => {
    const sortableItems = [...data]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortConfig])

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-black border-2 border-green-500 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-green-500">
          <h2 className="text-green-500 font-mono text-xl mb-2">
            SISTEMA DISTRIBUIDO - ESTADO DE NODOS
          </h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 text-green-500 border-green-500 font-mono"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
              size={18}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-900">
                {Object.keys(initialData[0]).map((key) => (
                  <th
                    key={key}
                    className="p-2 border-b border-green-500 font-mono text-green-300 cursor-pointer"
                    onClick={() => requestSort(key)}
                  >
                    <div className="flex items-center">
                      {key.toUpperCase()}
                      {sortConfig.key === key &&
                        (sortConfig.direction === 'ascending' ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                >
                  {Object.values(item).map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      className="p-2 border-b border-green-700 font-mono text-green-400"
                    >
                      {valueIndex === 2 ? (
                        <span
                          className={`px-2 py-1 rounded ${
                            value === 'ONLINE'
                              ? 'bg-green-900 text-green-300'
                              : value === 'OFFLINE'
                              ? 'bg-red-900 text-red-300'
                              : 'bg-yellow-900 text-yellow-300'
                          }`}
                        >
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px #22c55e, 0 0 10px #22c55e, 0 0 15px #22c55e,
              0 0 20px #22c55e;
          }
          100% {
            box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e,
              0 0 40px #22c55e;
          }
        }
        .bg-black {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  )
}
