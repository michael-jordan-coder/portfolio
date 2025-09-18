import * as React from "react"
import { cn } from "../../lib/utils"

export interface KPICardProps {
  title: string
  value: string
  unit: string
  improvement?: string
  isOptimized?: boolean
  className?: string
}

const KPICard = React.forwardRef<HTMLDivElement, KPICardProps>(
  ({ title, value, unit, improvement, isOptimized = false, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-neutral-200 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-neutral-300",
          isOptimized 
            ? "bg-gradient-to-br from-neutral-900 to-black h-[160px] shadow-md border-neutral-700" 
            : "bg-white h-[160px] shadow-sm",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h4 className={cn(
            "text-sm font-semibold uppercase tracking-wide transition-colors",
            isOptimized ? "text-neutral-300" : "text-neutral-600"
          )}>
            {title}
          </h4>
          {isOptimized && (
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "font-bold transition-colors",
            isOptimized 
              ? "text-4xl text-white leading-tight" 
              : "text-4xl text-neutral-900 leading-tight"
          )}>
            {value}
          </span>
          <span className={cn(
            "font-medium transition-colors",
            isOptimized 
              ? "text-lg text-neutral-300" 
              : "text-lg text-neutral-500"
          )}>
            {unit}
          </span>
        </div>
        
        {improvement && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-bold">↑</span>
              </div>
              <span className="text-sm text-emerald-600 font-semibold">{improvement}</span>
            </div>
            <span className="text-xs text-neutral-400">vs previous</span>
          </div>
        )}
      </div>
    )
  }
)

KPICard.displayName = "KPICard"

export { KPICard }
