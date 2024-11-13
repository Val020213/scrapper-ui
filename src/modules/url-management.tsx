'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-4 right-4 bg-background text-foreground border-primary"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function URLManagement() {
  const [urls, setUrls] = useState([
    { id: 1, url: 'https://example.com', status: 'Scrapeado', lastScraped: '2024-11-04 15:30:22' },
    { id: 2, url: 'https://test.com', status: 'Pendiente', lastScraped: '-' },
    { id: 3, url: 'https://sample.org', status: 'Error', lastScraped: '2024-11-04 16:45:10' },
  ])
  const [newUrl, setNewUrl] = useState('')
  const { theme } = useTheme()

  const addUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUrl) {
      setUrls([...urls, { id: urls.length + 1, url: newUrl, status: 'Pendiente', lastScraped: '-' }])
      setNewUrl('')
    }
  }

  const removeUrl = (id: number) => {
    setUrls(urls.filter(url => url.id !== id))
  }

  return (
    <div className="container mx-auto p-4 space-y-4 font-mono min-h-screen transition-colors duration-300
                    dark:bg-black dark:text-green-500 
                    light:bg-green-50 light:text-green-900" 
         style={{
           backgroundImage: theme === 'dark' 
             ? 'radial-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)'
             : 'radial-gradient(rgba(0, 100, 0, 0.1) 1px, transparent 1px)',
           backgroundSize: '4px 4px',
         }}>
      <style jsx global>{`
        @keyframes scanline {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .retro-card {
          overflow: hidden;
        }
        .retro-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(0, 255, 0, 0.5);
          animation: scanline 4s linear infinite;
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        .dark .retro-card {
          border: 1px solid #00ff00;
          box-shadow: 0 0 10px #00ff00;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .light .retro-card {
          border: 1px solid #006400;
          box-shadow: 0 0 10px #006400;
          background-color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
      <ThemeToggle />
      <Link href="/" className="fixed top-4 left-4 text-primary hover:underline">
        &lt; Volver al Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">GESTIÓN DE URLs<span className="blink">_</span></h1>
      
      <Card className="retro-card">
        <CardHeader>
          <CardTitle className="dark:text-green-500 light:text-green-700">Añadir Nueva URL</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addUrl} className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://ejemplo.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-grow dark:bg-gray-800 dark:text-green-400 light:bg-white light:text-green-800 border-primary"
            />
            <Button type="submit" className="dark:bg-green-700 dark:text-black light:bg-green-600 light:text-white">
              <Plus className="mr-2 h-4 w-4" /> Añadir
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="retro-card">
        <CardHeader>
          <CardTitle className="dark:text-green-500 light:text-green-700">URLs para Scrapear</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-green-500 light:text-green-700">URL</TableHead>
                <TableHead className="dark:text-green-500 light:text-green-700">Estado</TableHead>
                <TableHead className="dark:text-green-500 light:text-green-700">Último Scrape</TableHead>
                <TableHead className="dark:text-green-500 light:text-green-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell className="dark:text-green-400 light:text-green-600">{url.url}</TableCell>
                  <TableCell>
                    <Badge variant={url.status === 'Scrapeado' ? 'default' : url.status === 'Error' ? 'destructive' : 'secondary'}
                           className={`${
                             url.status === 'Scrapeado'
                               ? 'dark:bg-green-900 dark:text-green-300 light:bg-green-200 light:text-green-800'
                               : url.status === 'Error'
                               ? 'dark:bg-red-900 dark:text-red-300 light:bg-red-200 light:text-red-800'
                               : 'dark:bg-yellow-900 dark:text-yellow-300 light:bg-yellow-200 light:text-yellow-800'
                           }`}>
                      {url.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="dark:text-green-400 light:text-green-600">{url.lastScraped}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => removeUrl(url.id)}
                            className="dark:text-red-400 light:text-red-600 hover:dark:bg-red-900 hover:light:bg-red-200">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}