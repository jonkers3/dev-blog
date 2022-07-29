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
  return condition ? <>{children}</> : otherwise ?? null
}
