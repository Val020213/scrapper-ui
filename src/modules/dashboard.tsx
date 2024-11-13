'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertCircle, CheckCircle2, Server } from 'lucide-react'

// Datos de ejemplo para las métricas
const performanceData = [
  { time: '00:00', value: 65 },
  { time: '04:00', value: 75 },
  { time: '08:00', value: 85 },
  { time: '12:00', value: 70 },
  { time: '16:00', value: 90 },
  { time: '20:00', value: 80 },
  { time: '23:59', value: 85 },
]

// Datos de ejemplo para los nodos
const nodesData = [
  { id: 1, name: 'Node-A', role: 'Almacenamiento', status: 'Activo' },
  { id: 2, name: 'Node-B', role: 'Enrutamiento', status: 'Activo' },
  { id: 3, name: 'Node-C', role: 'Consulta', status: 'Inactivo' },
  { id: 4, name: 'Node-D', role: 'Almacenamiento', status: 'Activo' },
]

export default function Dashboard() {
  const [performance, setPerformance] = useState(75)
  const [latency, setLatency] = useState(120)
  const [availability, setAvailability] = useState(99.9)

  // Simulación de actualización de métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance(prev => Math.min(100, Math.max(0, prev + Math.random() * 10 - 5)))
      setLatency(prev => Math.max(0, prev + Math.random() * 20 - 10))
      setAvailability(prev => Math.min(100, Math.max(0, prev + Math.random() * 0.2 - 0.1)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Principal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{performance.toFixed(1)}%</div>
            <CardDescription>Rendimiento actual</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latencia de Respuesta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{latency.toFixed(0)}ms</div>
            <CardDescription>Latencia promedio</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disponibilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{availability.toFixed(2)}%</div>
            <CardDescription>Porcentaje de tiempo activo</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Métricas en Tiempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nodos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodesData.map((node) => (
                <TableRow key={node.id}>
                  <TableCell>{node.name}</TableCell>
                  <TableCell>{node.role}</TableCell>
                  <TableCell>
                    <Badge variant={node.status === 'Activo' ? 'default' : 'destructive'}>
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

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Alerta del Sistema</AlertTitle>
        <AlertDescription>
          El nodo Node-C está desconectado. Se requiere atención inmediata.
        </AlertDescription>
      </Alert>
    </div>
  )
}