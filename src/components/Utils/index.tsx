import * as React from 'react'

export function If({
  children,
  condition,
  otherwise
}: {
  children: React.ReactNode
  condition: boolean
  otherwise: unknown
}) {
  debugger
  return condition ? <>{children}</> : otherwise ?? null
}
