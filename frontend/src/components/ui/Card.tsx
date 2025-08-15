// ================================================================
// CARD COMPONENT - Componente de card reutilizável
// ================================================================

import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md'
}) => {
  // Classes de padding
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div
      className={cn(
        'bg-dark-900 border border-dark-700 rounded-xl shadow-xl',
        'transition-all duration-300',
        hover && 'hover:shadow-2xl hover:border-primary-800 hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card