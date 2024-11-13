'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertCircle, CheckCircle2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"

// Datos de ejemplo para las métricas (sin cambios)
const performanceData = [
  { time: '00:00', value: 65 },
  { time: '04:00', value: 75 },
  { time: '08:00', value: 85 },
  { time: '12:00', value: 70 },
  { time: '16:00', value: 90 },
  { time: '20:00', value: 80 },
  { time: '23:59', value: 85 },
]

// Datos de ejemplo para los nodos (sin cambios)
const nodesData = [
  { id: 1, name: 'Node-A', role: 'Almacenamiento', status: 'Activo' },
  { id: 2, name: 'Node-B', role: 'Enrutamiento', status: 'Activo' },
  { id: 3, name: 'Node-C', role: 'Consulta', status: 'Inactivo' },
  { id: 4, name: 'Node-D', role: 'Almacenamiento', status: 'Activo' },
]

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

export default function Dashboard() {
  const [performance, setPerformance] = useState(75)
  const [latency, setLatency] = useState(120)
  const [availability, setAvailability] = useState(99.9)
  const { theme } = useTheme()

  // Simulación de actualización de métricas en tiempo real (sin cambios)
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance(prev => Math.min(100, Math.max(0, prev + Math.random() * 10 - 5)))
      setLatency(prev => Math.max(0, prev + Math.random() * 20 - 10))
      setAvailability(prev => Math.min(100, Math.max(0, prev + Math.random() * 0.2 - 0.1)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
      <h1 className="text-3xl font-bold mb-6 text-center">SISTEMA DE SCRAPING DISTRIBUIDO<span className="blink">_</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Rendimiento", value: performance.toFixed(1) + "%", desc: "Rendimiento actual" },
          { title: "Latencia", value: latency.toFixed(0) + "ms", desc: "Latencia promedio" },
          { title: "Disponibilidad", value: availability.toFixed(2) + "%", desc: "Tiempo activo" }
        ].map((item, index) => (
          <Card key={index} className="retro-card">
            <CardHeader>
              <CardTitle className="dark:text-green-500 light:text-green-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold dark:text-green-400 light:text-green-600">{item.value}</div>
              <p className="dark:text-green-600 light:text-green-800">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="retro-card">
        <CardHeader>
          <CardTitle className="dark:text-green-500 light:text-green-700">Métricas en Tiempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <XAxis dataKey="time" stroke={theme === 'dark' ? "#00ff00" : "#006400"} />
              <YAxis stroke={theme === 'dark' ? "#00ff00" : "#006400"} />
              <Tooltip contentStyle={{ 
                backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
                border: theme === 'dark' ? '1px solid #00ff00' : '1px solid #006400',
                color: theme === 'dark' ? '#00ff00' : '#006400'
              }} />
              <Line type="stepAfter" dataKey="value" stroke={theme === 'dark' ? "#00ff00" : "#006400"} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="retro-card">
        <CardHeader>
          <CardTitle className="dark:text-green-500 light:text-green-700">Nodos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-green-500 light:text-green-700">Nombre</TableHead>
                <TableHead className="dark:text-green-500 light:text-green-700">Rol</TableHead>
                <TableHead className="dark:text-green-500 light:text-green-700">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodesData.map((node) => (
                <TableRow key={node.id}>
                  <TableCell className="dark:text-green-400 light:text-green-600">{node.name}</TableCell>
                  <TableCell className="dark:text-green-400 light:text-green-600">{node.role}</TableCell>
                  <TableCell>
                    <Badge variant={node.status === 'Activo' ? 'default' : 'destructive'} 
                           className={`${node.status === 'Activo' 
                             ? 'dark:bg-green-900 dark:text-green-300 light:bg-green-200 light:text-green-800' 
                             : 'dark:bg-red-900 dark:text-red-300 light:bg-red-200 light:text-red-800'}`}>
                      {node.status === 'Activo' ? (
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                      ) : (
                        <AlertCircle className="mr-1 h-4 w-4" />
                      )}
                      {node.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-500 dark:text-red-300 light:bg-red-100 light:border-red-300 light:text-red-700">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>ALERTA CRÍTICA</AlertTitle>
        <AlertDescription>
          Node-C desconectado. Iniciar protocolo de recuperación inmediatamente.
        </AlertDescription>
      </Alert>
    </div>
  )
}