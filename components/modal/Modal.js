import React from 'react'
import { styled } from '../../stitches.config'

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

export const ModalOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  zIndex: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const ModalContent = styled('div', {
  backgroundColor: 'black',
  padding: '30px',
  borderRadius: '$borderRadius',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '85vh',
  overflowY: 'auto',
  position: 'relative',
  color: 'white',
})

export const CloseButton = styled('button', {
  position: 'absolute',
  top: '15px',
  right: '15px',
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
  '&:hover': {
    color: '$primary',
  },
})
