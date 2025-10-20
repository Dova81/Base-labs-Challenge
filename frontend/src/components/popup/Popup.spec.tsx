import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CornerPopup from './Popup'
import { vi } from 'vitest'

describe('CornerPopup', () => {
  it('renders message and calls onClose when button clicked', () => {
    const onClose = vi.fn()
    render(<CornerPopup message="Hola" onClose={onClose} />)

    expect(screen.getByText('Hola')).toBeInTheDocument()
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(onClose).toHaveBeenCalled()
  })
})
