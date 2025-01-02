'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { Button } from "@/components/ui/button"
import Matter from 'matter-js'

const specialties = [
  { id: 1, ja: 'フロントエンド開発', en: 'Front end development' },
  { id: 2, ja: 'AIツール活用', en: 'Utilization of AI tools' },
  { id: 3, ja: 'RAD開発', en: 'RAD development' },
  { id: 4, ja: 'バックエンド設計', en: 'Backend design' },
  { id: 5, ja: 'AIコンサルティング', en: 'AI consulting' }
]

declare module 'matter-js' {
  interface IBodyDefinition {
    specialty?: { id: number; ja: string; en: string };
    label?: string;
  }
}

declare global {
  interface Window {
    Matter: typeof Matter;
  }
}

export default function SpecialtyPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [matterLoaded, setMatterLoaded] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const engineRef = useRef<any>(null)
  const circlesRef = useRef<any[]>([])

  useEffect(() => {
    if (!matterLoaded || !sceneRef.current || !window.Matter) return

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Composite, Vector, Events } = window.Matter

    const engine = Engine.create()
    engineRef.current = engine

    // レンダラーのサイズを調整
    const containerWidth = Math.min(800, window.innerWidth - 40) // 画面幅に応じて調整
    const containerHeight = 600

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: '#f5f5f5'
      }
    })

    // ボウルの形状を調整
    const groundPoints = []
    const segments = 30
    const width = containerWidth
    const height = containerHeight
    const baseY = height - 100
    const curveHeight = 80
    
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments
      const x = progress * width
      const normalizedX = (progress * 2) - 1
      const y = baseY - curveHeight * (normalizedX * normalizedX)
      groundPoints.push(Vector.create(x, y))
    }

    const groundBodies = []
    for (let i = 0; i < groundPoints.length - 1; i++) {
      const current = groundPoints[i]
      const next = groundPoints[i + 1]
      const center = {
        x: (current.x + next.x) / 2,
        y: (current.y + next.y) / 2
      }
      const width = Math.sqrt(
        Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2)
      )
      const angle = Math.atan2(next.y - current.y, next.x - current.x)
      
      const segment = Bodies.rectangle(center.x, center.y, width, 5, {
        isStatic: true,
        angle: angle,
        render: { 
          fillStyle: '#ddd',
          strokeStyle: '#ddd',
          lineWidth: 1
        }
      })
      groundBodies.push(segment)
    }

    const wallOptions = { 
      isStatic: true, 
      render: { 
        visible: false 
      }
    }

    const leftWall = Bodies.rectangle(-10, height/2, 20, height, wallOptions)
    const rightWall = Bodies.rectangle(width + 10, height/2, 20, height, wallOptions)

    // サークルの初期位置を調整
    const circleRadius = 50
    const circles = specialties.map((specialty, index) => {
      const spacing = (containerWidth - 100) / (specialties.length - 1)
      return Bodies.circle(50 + index * spacing, 50, circleRadius, {
        restitution: 0.5,
        friction: 0.1,
        frictionAir: 0.001,
        render: { 
          fillStyle: '#fff',
          strokeStyle: '#000',
          lineWidth: 1
        },
        label: specialty.ja,
        specialty: specialty
      })
    })
    circlesRef.current = circles

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })

    Events.on(render, 'afterRender', () => {
      const ctx = render.context
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#000'

      circles.forEach(circle => {
        const pos = circle.position
        const specialty = (circle as any).specialty
        const angle = circle.angle

        ctx.save()
        ctx.translate(pos.x, pos.y)
        ctx.rotate(angle)

        ctx.font = 'bold 14px Arial'
        ctx.fillText(specialty.ja, 0, -10)

        ctx.font = '12px Arial'
        ctx.fillText(specialty.en, 0, 10)

        ctx.restore()
      })
    })

    Composite.add(engine.world, [
      ...groundBodies,
      leftWall,
      rightWall,
      ...circles,
      mouseConstraint
    ])

    Engine.run(engine)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.world, false)
      Engine.clear(engine)
      render.canvas.remove()
    }
  }, [matterLoaded, resetKey])

  const handleReset = () => {
    if (engineRef.current && circlesRef.current) {
      const { World, Bodies } = window.Matter
      
      World.remove(engineRef.current.world, circlesRef.current)

      const containerWidth = Math.min(800, window.innerWidth - 40)
      const newCircles = specialties.map((specialty, index) => {
        const spacing = (containerWidth - 100) / (specialties.length - 1)
        return Bodies.circle(50 + index * spacing, 50, 50, {
          restitution: 0.5,
          friction: 0.1,
          frictionAir: 0.001,
          render: { 
            fillStyle: '#fff',
            strokeStyle: '#000',
            lineWidth: 1
          },
          label: specialty.ja,
          specialty: specialty
        })
      })

      World.add(engineRef.current.world, newCircles)
      circlesRef.current = newCircles
      setResetKey(prev => prev + 1)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-[800px] h-[600px] mx-auto">
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"
          onLoad={() => {
            console.log('Matter.js script loaded')
            setMatterLoaded(true)
          }}
        />
        <div className="absolute top-4 w-full flex items-center justify-between px-4 z-10">
          <h2 className="text-2xl font-bold">SPECIALTY FIELD</h2>
          <Button onClick={handleReset}>Reset</Button>
        </div>
        <div ref={sceneRef} className="w-full h-full" />
      </div>
    </div>
  )
}