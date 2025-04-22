import React from 'react'
import { styled } from '../../stitches.config'
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContentWrapper
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            {/* Add an inner scrollable container */}
            <ScrollableContentArea>{children}</ScrollableContentArea>
          </ModalContentWrapper>
        </ModalOverlay>
      )}
    </AnimatePresence>
  )
}

const ModalOverlay = styled(motion.div, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
})

const ModalContentWrapper = styled(motion.div, {
  position: 'relative', // Keep relative for absolute positioning of button
  background: '$background',
  borderRadius: '$borderRadius',
  width: '100%',
  maxWidth: '700px',
  maxHeight: '90vh',
  overflow: 'hidden', // Keep hidden on wrapper
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
})

// New inner container for scrolling content
const ScrollableContentArea = styled('div', {
  // Adjust padding: Increase top padding significantly
  padding: '60px 40px 40px 40px', // Top: 60px, Right/Bottom/Left: 40px
  overflowY: 'auto',
  overflowX: 'hidden',
  flex: 1,
  minHeight: 0,
})

const CloseButton = styled('button', {
  position: 'absolute',
  // Adjust position slightly if needed relative to the wrapper's edge
  top: '20px', // Slightly more space from the very top edge
  right: '20px', // Slightly more space from the right edge
  background: 'none',
  border: 'none',
  fontSize: '28px',
  lineHeight: 1,
  color: '$secondary',
  cursor: 'pointer',
  padding: '5px',
  transition: 'color 0.2s ease',
  zIndex: 10, // Keep button above scrollable content
  '&:hover': {
    color: '$primary',
  },
})
