"use client"

import { useEffect, useRef } from "react"

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGrid()
    }

    const drawGrid = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid settings
      const cellSize = 50
      const lineWidth = 0.5
      const lineColor = "rgba(255, 255, 255, 0.1)"

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add some glowing dots at intersections
      const glowColor = "rgba(138, 43, 226, 0.8)"
      const glowRadius = 2

      for (let x = 0; x <= canvas.width; x += cellSize * 2) {
        for (let y = 0; y <= canvas.height; y += cellSize * 2) {
          // Random chance to draw a dot
          if (Math.random() > 0.7) {
            ctx.fillStyle = glowColor
            ctx.beginPath()
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
            ctx.fill()

            // Add glow effect
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius * 4)
            gradient.addColorStop(0, "rgba(138, 43, 226, 0.3)")
            gradient.addColorStop(1, "rgba(138, 43, 226, 0)")

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, glowRadius * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Animate some elements
    let animationFrameId: number

    const animate = () => {
      drawGrid()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" style={{ opacity: 0.7 }} />
}

