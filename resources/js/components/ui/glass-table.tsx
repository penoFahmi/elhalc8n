import * as React from "react"
import { cn } from "@/lib/utils"

const GlassTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-xl border border-[#00FF41]/20 bg-[#141414]/70 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.05)]">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm text-gray-300", className)}
      {...props}
    />
  </div>
))
GlassTable.displayName = "GlassTable"

const GlassTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-[#00FF41]/20", className)} {...props} />
))
GlassTableHeader.displayName = "GlassTableHeader"

const GlassTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
GlassTableBody.displayName = "GlassTableBody"

const GlassTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[#00FF41]/20 bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
GlassTableFooter.displayName = "GlassTableFooter"

const GlassTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[#00FF41]/10 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
GlassTableRow.displayName = "GlassTableRow"

const GlassTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-[#00FF41] uppercase tracking-wider text-xs [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
GlassTableHead.displayName = "GlassTableHead"

const GlassTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
GlassTableCell.displayName = "GlassTableCell"

const GlassTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
GlassTableCaption.displayName = "GlassTableCaption"

export {
  GlassTable,
  GlassTableHeader,
  GlassTableBody,
  GlassTableFooter,
  GlassTableHead,
  GlassTableRow,
  GlassTableCell,
  GlassTableCaption,
}
