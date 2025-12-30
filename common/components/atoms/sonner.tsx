"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      icons={{
        error: null,
        success: null,
        warning: null,
        info: null,
        loading: null,
      }}
      style={
        {
          "--error-bg": "#EF4444", // rojo para el estado error
          "--error-text": "#FFFFFF", // texto blanco
          "--error-border": "#DC2626",
          "--error-radius": "var(--radius)",
          
          "--success-bg": "#10B981", // verde para el estado success
          "--success-text": "#FFFFFF", // texto blanco
          "--success-border": "#16A34A", 

          "--info-bg": "#F97316", // naranja para el estado de info
          "--info-text": "#FFFFFF", // texto blanco
          "--info-border": "#EA580C", 
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
