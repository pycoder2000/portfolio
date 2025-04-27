import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import React Icons
import { styled } from '../../stitches.config'

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
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Name>{person.name}</Name>
            <Title>{person.title}</Title>
            <Company>{person.company}</Company>
            {person.location && <Location>{person.location}</Location>}
            <Meta>
              <Status status={person.status}>
                {person.status === 'Met' ? 'Met' : 'Want to Meet'}
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
              {person.linkedin && (
                <LinkIcon
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </LinkIcon>
              )}
              {person.twitter && (
                <LinkIcon
                  href={person.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
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

const Location = styled('div', {
  fontSize: '14px',
  color: '$secondary',
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
  alignItems: 'center',
})

const Notes = styled('div', {
  marginTop: '14px',
  fontSize: '13px',
  color: '$secondary',
  textAlign: 'center',
  opacity: 0.85,
})
