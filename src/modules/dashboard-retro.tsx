'use client'

import { Card, CardContent, CardHeader, Table, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

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

export default function Dashboard() {
  const [performance, setPerformance] = useState(75)
  const [latency, setLatency] = useState(120)
  const [availability, setAvailability] = useState(99.9)

  // Simulación de actualización de métricas en tiempo real (sin cambios)
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformance((prev) =>
        Math.min(100, Math.max(0, prev + Math.random() * 10 - 5))
      )
      setLatency((prev) => Math.max(0, prev + Math.random() * 20 - 10))
      setAvailability((prev) =>
        Math.min(100, Math.max(0, prev + Math.random() * 0.2 - 0.1))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="container mx-auto p-4 space-y-4 bg-black text-green-500 font-mono"
      style={{
        backgroundImage:
          'radial-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
      }}
    >
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
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .retro-card {
          border: 1px solid #00ff00;
          box-shadow: 0 0 10px #00ff00;
          background-color: rgba(0, 0, 0, 0.8);
          overflow: hidden;
        }
        .retro-card::before {
          content: '';
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
      `}</style>
      <h1 className="text-3xl font-bold mb-6 text-center">
        SISTEMA DE SCRAPING DISTRIBUIDO<span className="blink">_</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Rendimiento',
            value: performance.toFixed(1) + '%',
            desc: 'Rendimiento actual',
          },
          {
            title: 'Latencia',
            value: latency.toFixed(0) + 'ms',
            desc: 'Latencia promedio',
          },
          {
            title: 'Disponibilidad',
            value: availability.toFixed(2) + '%',
            desc: 'Tiempo activo',
          },
        ].map((item, index) => (
          <Card key={index} className="retro-card">
            <CardHeader>
              <Typography className="text-green-500">{item.title}</Typography>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-400">
                {item.value}
              </div>
              <p className="text-green-600">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="retro-card">
        <CardHeader>
          <Typography className="text-green-500">
            Métricas en Tiempo Real
          </Typography>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <XAxis dataKey="time" stroke="#00ff00" />
              <YAxis stroke="#00ff00" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid #00ff00',
                }}
              />
              <Line
                type="stepAfter"
                dataKey="value"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="retro-card">
        <CardHeader>
          <Typography className="text-green-500">Nodos Activos</Typography>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-500">Nombre</TableHead>
                <TableHead className="text-green-500">Rol</TableHead>
                <TableHead className="text-green-500">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodesData.map((node) => (
                <TableRow key={node.id}>
                  <TableCell className="text-green-400">{node.name}</TableCell>
                  <TableCell className="text-green-400">{node.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        node.status === 'Activo' ? 'default' : 'destructive'
                      }
                      className={`bg-black border ${
                        node.status === 'Activo'
                          ? 'border-green-500 text-green-500'
                          : 'border-red-500 text-red-500'
                      }`}
                    >
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
    </div>
  )
}
