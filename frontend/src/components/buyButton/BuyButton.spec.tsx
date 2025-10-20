import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BuyButton from './BuyButton'
import { vi } from 'vitest'

describe('BuyButton', () => {
  it('renders children and calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<BuyButton loading={false} onClick={onClick}>Comprar</BuyButton>)

    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Comprar')
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalled()
  })

  it('shows processing text and is disabled when loading', () => {
    const onClick = vi.fn()
    render(<BuyButton loading={true} onClick={onClick}>Comprar</BuyButton>)

    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Procesando...')
    expect(btn).toBeDisabled()
    fireEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })
})
