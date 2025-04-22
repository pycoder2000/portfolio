import React from 'react'
import { format, parseISO } from 'date-fns'
import { styled } from '../../stitches.config'
import { Modal } from '../modal/Modal' // Use NAMED import

export default function WorkModal({ work, isOpen, onClose, getDuration }) {
  if (!work) return null

  return (
    // Use the new Modal component
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header with Logo and Text */}
      <Header>
        <Logo src={work.companyLogo} alt={`${work.company} logo`} />
      </Header>

      <HeaderText>
        <Title>{work.jobTitle}</Title>
        <Company>{work.company}</Company>
      </HeaderText>

      {/* Meta Info: Dates & Location */}
      <MetaInfo>
        <span>
          {format(parseISO(work.startDate), 'MMM yyyy')} -{' '}
          {work.endDate
            ? format(parseISO(work.endDate), 'MMM yyyy')
            : 'Present'}
          {' · '}
          {getDuration(work.startDate, work.endDate)}
        </span>
        <span>{work.location}</span>
      </MetaInfo>

      {/* Description List */}
      <Description>
        {work.description?.map((item, index) => (
          <DescriptionItem key={index}>{item}</DescriptionItem>
        ))}
      </Description>

      {work.companyUrl && (
        <Link href={work.companyUrl} target="_blank" rel="noopener noreferrer">
          Visit Company Website →
        </Link>
      )}
    </Modal>
  )
}

// --- Styled Components for the New Design ---

const Header = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '30px', // Increased space below the header section
  gap: '25px', // Increased space between logo and text
  // border: '1px solid red', // Keep for debugging if needed
})

const Logo = styled('img', {
  width: '50px',
  height: '50px',
  objectFit: 'contain',
  flexShrink: 0,
  marginTop: '5px',
})

const HeaderText = styled('div', {
  flex: 1,
  minWidth: 0,
  textAlign: 'center', // Center align the text (Title and Company)
  // border: '1px solid blue', // Keep for debugging if needed
})

const Title = styled('h1', {
  fontSize: '24px',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 4px 0',
  lineHeight: 1.3,
  wordBreak: 'break-word',
  // border: '1px solid green', // Keep for debugging if needed
})

const Company = styled('h2', {
  fontSize: '18px',
  fontWeight: '400',
  color: '$secondary',
  margin: 0,
  lineHeight: 1.4,
  wordBreak: 'break-word',
})

const MetaInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '10px', // Increased padding top/bottom
  borderTop: '1px solid $hover',
  borderBottom: '1px solid $hover',
  marginTop: '20px',
  marginBottom: '20px', // Increased space below MetaInfo
  fontSize: '14px',
  color: '$secondary',
  lineHeight: 1.5,

  '@bp1': {
    flexDirection: 'row',
  },
})


const Description = styled('div', {
  color: 'white', // Default text color for description
  fontSize: '16px',
  lineHeight: 1.7,
})

const DescriptionItem = styled('p', {
  margin: '0 0 12px 0',
  paddingLeft: '20px', // Indent list items
  position: 'relative',
  '&::before': {
    content: '"•"', // Bullet point
    position: 'absolute',
    left: '0',
    color: '$primary', // Use primary color for bullet
    fontWeight: 'bold',
  },
})

const Link = styled('a', {
  display: 'inline-block',
  fontSize: '14px',
  color: '$primary',
  textDecoration: 'none',
  fontWeight: '500',
  marginTop: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
})