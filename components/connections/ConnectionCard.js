import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { styled } from '../../stitches.config'

export default function ConnectionCard({ person, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <AnimContainer
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered && (
        <AnimHovered
          layoutId="connectionHover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <Card>
        <Body>
          <Name>{person.name}</Name>
          <Title>{person.title}</Title>
          <Company>{person.company}</Company>
          <Status status={person.status}>
            {person.status === 'Met' ? 'Met' : 'Want to Meet'}
          </Status>
        </Body>
      </Card>
    </AnimContainer>
  )
}

const AnimContainer = styled(motion.div, {
  position: 'relative',
  padding: '10px',
  cursor: 'pointer',
  width: '100%',
  '@bp2': { width: 180 },
})

const AnimHovered = styled(motion.span, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})

const Card = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  transition: 'opacity $duration ease-in-out',
  border: '0',
  padding: '10px',
  borderRadius: '$borderRadius',
  textDecoration: 'none',
  width: '100%',
  '&:hover': { opacity: 1 },
})

const Body = styled('div', {
  flex: '1 1 auto',
})

const Name = styled('p', {
  fontSize: '18px',
  fontWeight: 700,
  margin: '0',
  color: '$primary',
})

const Title = styled('p', {
  fontSize: '14px',
  color: '$secondary',
  margin: '0',
})

const Company = styled('p', {
  fontSize: '13px',
  color: '$cyan',
  margin: '0',
})

const Status = styled('button', {
  appearance: 'none',
  border: '1px solid $primary',
  borderRadius: '5px',
  marginTop: '8px',
  padding: '4px 12px',
  fontSize: '13px',
  fontWeight: 600,
  background: 'transparent',
  color: '$primary',
  cursor: 'pointer',
  transition: 'all $duration ease-in-out',
  '&:hover': {
    background: '$primary',
    color: '$background',
  },
})
