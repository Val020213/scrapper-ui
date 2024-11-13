'use client'

import { useState, useEffect } from 'react'
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedPC, setSelectedPC] = useState('PC-001')
  const [logs, setLogs] = useState<string[]>([])

  // Simulated log data
  const pcLogs = {
    'PC-001': [
      'Initializing scraper...',
      'Connecting to target site...',
      'Scraping data from page 1...',
      'Data extracted successfully.',
      'Moving to page 2...'
    ],
    'PC-002': [
      'Scraper started.',
      'Authenticating...',
      'Authentication successful.',
      'Navigating to product catalog...',
      'Extracting product details...'
    ],
    'PC-003': [
      'Beginning scrape process...',
      'Checking robot.txt...',
      'Setting user agent...',
      'Sending GET request...',
      'Parsing HTML response...'
    ]
  }

  useEffect(() => {
    setLogs(pcLogs[selectedPC] || [])
  }, [selectedPC])

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold animate-pulse">RETRO SCRAPER 1.0</h1>
      </header>
      
      <div className="max-w-2xl mx-auto bg-gray-900 p-4 rounded-lg border-2 border-green-500 shadow-lg shadow-green-500/50">
        <div className="mb-4">
          <label htmlFor="pc-select" className="block mb-2">Select PC:</label>
          <Select 
            id="pc-select"
            value={selectedPC} 
            onValueChange={setSelectedPC}
            className="w-full bg-black border-green-500 text-green-500"
          >
            <option value="PC-001">PC-001</option>
            <option value="PC-002">PC-002</option>
            <option value="PC-003">PC-003</option>
          </Select>
        </div>
        
        <div className="bg-black p-4 rounded h-64 overflow-auto mb-4 border border-green-500">
          <pre className="text-sm leading-relaxed">
            {logs.map((log, index) => (
              <div key={index} className="mb-1 animate-typewriter">
                {`> ${log}`}
              </div>
            ))}
          </pre>
        </div>
        
        <div className="flex justify-between">
          <Button className="bg-green-700 hover:bg-green-600 text-black font-bold py-2 px-4 rounded">
            Start Scraper
          </Button>
          <Button className="bg-red-700 hover:bg-red-600 text-black font-bold py-2 px-4 rounded">
            Stop Scraper
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">
            Clear Logs
          </Button>
        </div>
      </div>
    </div>
  )
}