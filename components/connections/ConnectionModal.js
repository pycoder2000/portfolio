import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import linkedinIcon from '../../public/static/icons/linkedin.json'
import tweetsIcon from '../../public/static/icons/tweets.json'
import { styled } from '../../stitches.config'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function ConnectionModal({ person, isOpen, onClose }) {
  const linkedinRef = useRef(null)
  const tweetsRef = useRef(null)
  const iconSize = { width: 24, height: 24 }

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
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Name>{person.name}</Name>
            <Title>{person.title}</Title>
            <Company>{person.company}</Company>
            {(person.location || person.metOn) && (
              <LocationMeta>
                {person.location && <span>{person.location}</span>}
                {person.location && person.metOn && <Dot>•</Dot>}
                {person.metOn && (
                  <span>{format(new Date(person.metOn), 'MMM dd, yyyy')}</span>
                )}
              </LocationMeta>
            )}
            <Meta>
              <Status status={person.status}>
                {person.status === 'Met' ? 'Met' : 'Want to Meet'}
              </Status>
            </Meta>
            {person.tags?.length > 0 && (
              <Tags>
                {person.tags.map((tag, idx) => (
                  <Tag
                    as={motion.span}
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {tag}
                  </Tag>
                ))}
              </Tags>
            )}
            <Links>
              {person.linkedin && (
                <LinkIcon
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onMouseEnter={() => linkedinRef.current?.play()}
                  onMouseLeave={() => linkedinRef.current?.stop()}
                >
                  <Lottie
                    lottieRef={linkedinRef}
                    style={iconSize}
                    animationData={linkedinIcon}
                    loop={true}
                    autoplay={false}
                  />
                </LinkIcon>
              )}
              {person.twitter && (
                <LinkIcon
                  href={person.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  onMouseEnter={() => tweetsRef.current?.play()}
                  onMouseLeave={() => tweetsRef.current?.stop()}
                >
                  <Lottie
                    lottieRef={tweetsRef}
                    style={iconSize}
                    animationData={tweetsIcon}
                    loop={true}
                    autoplay={false}
                  />
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
  backdropFilter: 'blur(6px)',
})

const ModalContent = styled('div', {
  background: 'rgba(24,24,28,0.98)',
  borderRadius: '20px',
  boxShadow: '0 8px 48px rgba(0,0,0,0.2)',
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
  '&:hover': {
    color: '$primary',
    transform: 'rotate(5deg)',
    transition: 'all 0.3s ease',
  },
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
  '&:hover': {
    color: '$cyan',
    transform: 'scale(1.3)',
    transition: 'all 0.3s ease',
  },
  display: 'flex',
  borderBottom: 'none',
  alignItems: 'center',
})

const Notes = styled('div', {
  marginTop: '14px',
  fontSize: '13px',
  color: '$secondary',
  textAlign: 'center',
  opacity: 0.85,
})

const LocationMeta = styled('div', {
  fontSize: '14px',
  color: '$secondary',
  marginBottom: '10px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
})
