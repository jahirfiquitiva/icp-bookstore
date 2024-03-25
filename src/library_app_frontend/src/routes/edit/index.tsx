import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/')({
  beforeLoad: async () => {
    throw redirect({ to: '/' })
  }
})
