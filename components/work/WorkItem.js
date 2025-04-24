import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { styled } from '../../stitches.config'
import { parseISO, differenceInMonths } from 'date-fns'

export default function WorkItem({ work, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  const getDuration = (start, end) => {
    const startDate = parseISO(start)
    const endDate = end ? parseISO(end) : new Date()
    const months = differenceInMonths(endDate, startDate)
    const decimalYears = Math.ceil((months / 12) * 10) / 10

    if (decimalYears >= 1) {
      return `${decimalYears.toFixed(1)} yr${decimalYears !== 1 ? 's' : ''}`
    }
    return `${months + 1} mos`
  }



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
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}

        <Logo src={work.companyLogo} alt={`${work.company} logo`} />
        <Body>
          <Title>{work.jobTitle}</Title>
          <Company>
            {work.company}
            {work.startDate && (
              <>
                {' • '}
                {getDuration(work.startDate, work.endDate)}
              </>
            )}
          </Company>
          <TechList>
            {work.technologies?.slice(0, 4).map((tech, index) => (
              <TechItem key={index}>{tech}</TechItem>
            ))}
            {work.technologies?.length > 4 && (
              <MoreTech>+{work.technologies.length - 4}</MoreTech>
            )}
          </TechList>
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
  marginTop: '10px',
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

export const RoleType = styled('p', {
  color: '$highlight',
  fontSize: '13px',
  margin: '2px 0 0',
  fontStyle: 'italic',
})

export const TechList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '6px',
  marginTop: '10px',
})

export const TechItem = styled('span', {
  background: '#18181b',
  color: '$primary',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '999px',
})

export const MoreTech = styled('span', {
  color: '$secondary',
  fontSize: '12px',
  alignSelf: 'center',
})

const AnimContainer = styled(motion.div, {
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '12px',
  marginBottom: '12px',
  padding: '5px',
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-12px) scale(1.07)',
    boxShadow: '0 20px 48px 0 rgba(31,38,135,0.28)',
  },
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
