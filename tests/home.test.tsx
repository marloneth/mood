import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
import React from 'react'

const userId = '3759cde2-a0c2-4d18-a146-fe738a58296b'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      inSignedIn: true,
      user: {
        id: userId,
        fullName: 'Charles Harris',
      },
    }),
  }
})

test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('get started')).toBeTruthy()
})
