import React, { useState } from 'react'
import { styled } from '../../stitches.config'
import { motion } from 'framer-motion'

export default function WorkItem({ work, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <WorkContainer
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimContainer>
        {isHovered && (
          <AnimHovered
            layoutId="sharedHover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <Logo src={work.companyLogo} alt={`${work.company} logo`} />
        <Body>
          <Title>{work.jobTitle}</Title>
          <Company>{work.company}</Company>
        </Body>
      </AnimContainer>
    </WorkContainer>
  )
}

export const WorkContainer = styled('div', {
  display: 'flex',
  cursor: 'pointer',
  transition: 'opacity $duration ease-in-out',
  border: '0',
  borderRadius: '$borderRadius',
  textDecoration: 'none',
  width: 'auto',
  '&:hover': { opacity: 1 },
})

export const Logo = styled('img', {
  width: '60px',
  height: '60px',
  marginBottom: '10px',
  objectFit: 'contain',
  position: 'relative',
  zIndex: 1,
})

export const Body = styled('div', {
  flex: '1 1 auto',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
})

export const Title = styled('p', {
  color: '$primary',
  fontSize: '18px',
  margin: '0',
  fontWeight: 'bold',
})

export const Company = styled('p', {
  color: '$secondary',
  fontSize: '14px',
  margin: '5px 0 0',
})

const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const AnimHovered = styled(motion.span, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: 0,
})