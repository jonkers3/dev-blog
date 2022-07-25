import * as React from 'react'

export function If({
  children,
  condition
}: {
  children: React.ReactNode
  condition: boolean
}) {
  return condition ? <>{children}</> : null
}
