import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { styled } from '../../stitches.config'
import { format } from 'date-fns'

export default function ConnectionModal({ person, isOpen, onClose }) {
  if (!person) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} // Faster overlay animation
          onClick={onClose}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }} // Faster modal animation
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Name>{person.name}</Name>
            <Title>{person.title}</Title>
            <Company>{person.company}</Company>
            <Meta>
              <Status status={person.status}>
                {person.status === 'met' ? 'Met' : 'Want to Meet'}
              </Status>
              <Dot>•</Dot>
              <MetOn>
                {person.metOn
                  ? format(new Date(person.metOn), 'MMM dd, yyyy')
                  : '—'}
              </MetOn>
            </Meta>
            <Tags>
              {person.tags?.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
            <Links>
              {person.links?.linkedin && (
                <LinkIcon
                  href={person.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                  </svg>
                </LinkIcon>
              )}
              {person.links?.twitter && (
                <LinkIcon
                  href={person.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z" />
                  </svg>
                </LinkIcon>
              )}
            </Links>
            {person.notes && <Notes>{person.notes}</Notes>}
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(20, 20, 24, 0.85)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const ModalContent = styled('div', {
  background: 'rgba(24,24,28,0.98)',
  borderRadius: '20px',
  boxShadow: '0 8px 48px 0 rgba(31,38,135,0.22)',
  padding: '40px 32px 32px 32px',
  minWidth: 320,
  maxWidth: 400,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
})

const CloseButton = styled('button', {
  position: 'absolute',
  top: 18,
  right: 22,
  background: 'none',
  border: 'none',
  color: '$secondary',
  fontSize: '2rem',
  cursor: 'pointer',
  zIndex: 2,
  transition: 'color 0.2s',
  '&:hover': { color: '$primary' },
})

const Avatar = styled('img', {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '18px',
  border: '3px solid #80ffea22',
  background: '#18181b',
})

const Name = styled('h2', {
  fontSize: '24px',
  fontWeight: 700,
  margin: '0 0 4px 0',
  color: '$primary',
  textAlign: 'center',
})

const Title = styled('div', {
  fontSize: '17px',
  color: '$secondary',
  marginBottom: '2px',
  textAlign: 'center',
})

const Company = styled('div', {
  fontSize: '15px',
  color: '$cyan',
  fontWeight: 500,
  marginBottom: '10px',
  textAlign: 'center',
})

const Meta = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: '$secondary',
  marginBottom: '10px',
})

const Status = styled('span', {
  padding: '2px 10px',
  borderRadius: '999px',
  fontWeight: 600,
  fontSize: '12px',
  background: 'linear-gradient(90deg, #80ffea33, #9580ff33)',
  color: '$primary',
  variants: {
    status: {
      met: { background: 'linear-gradient(90deg, #80ffea33, #8aff8033)' },
      'want-to-meet': {
        background: 'linear-gradient(90deg, #9580ff33, #ff80bf33)',
      },
    },
  },
})

const Dot = styled('span', {
  fontSize: '18px',
  color: '$secondary',
  margin: '0 2px',
})

const MetOn = styled('span', {
  fontSize: '13px',
  color: '$secondary',
})

const Tags = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  margin: '8px 0 0 0',
  justifyContent: 'center',
})

const Tag = styled('span', {
  background: '#232526',
  color: '$primary',
  fontSize: '12px',
  padding: '3px 10px',
  borderRadius: '999px',
  fontWeight: 500,
})

const Links = styled('div', {
  display: 'flex',
  gap: '12px',
  margin: '12px 0 0 0',
  textDecoration: 'none',
})

const LinkIcon = styled('a', {
  color: '$secondary',
  transition: 'color 0.2s',
  '&:hover': { color: '$cyan' },
  display: 'flex',
  alignItems: 'center'
})

const Notes = styled('div', {
  marginTop: '14px',
  fontSize: '13px',
  color: '$secondary',
  textAlign: 'center',
  opacity: 0.85,
})
