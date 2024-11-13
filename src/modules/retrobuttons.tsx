import React, { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'font-mono text-sm inline-flex items-center justify-center rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-green-900 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-black focus:ring-green-500',
        fill: 'bg-green-500 text-black border-2 border-green-500 hover:bg-green-600 focus:ring-green-500',
        error:
          'bg-red-900 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-black focus:ring-red-500',
        danger:
          'bg-orange-900 text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-black focus:ring-orange-500',
        ghost:
          'bg-transparent text-green-500 hover:bg-green-900 focus:ring-green-500',
      },
      size: {
        default: 'text-sm px-3 py-2',
        sm: 'text-xs px-2 py-1',
        lg: 'text-base px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const RetroButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), {
          'opacity-50 cursor-not-allowed': disabled,
        })}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
        <span className="absolute inset-0 overflow-hidden rounded">
          <span
            className="absolute inset-0 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 0, 0.1) 1px, rgba(0, 255, 0, 0.1) 2px)',
            }}
          ></span>
        </span>
      </button>
    )
  }
)
RetroButton.displayName = 'RetroButton'

export { RetroButton, buttonVariants }
