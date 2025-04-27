import { format, parseISO } from 'date-fns'
import React from 'react'
import { styled } from '../../stitches.config'
import { Modal } from '../modal/Modal'

export default function WorkModal({ work, isOpen, onClose, getDuration }) {
  if (!work) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header>
        <Logo src={work.companyLogo} alt={`${work.company} logo`} />
      </Header>

      <HeaderText>
        <Title>{work.jobTitle}</Title>
        <Company>{work.company}</Company>
        {work.roleType && <RoleType>{work.roleType}</RoleType>}
      </HeaderText>

      <MetaInfo>
        <span>
          {format(parseISO(work.startDate), 'MMM yyyy')} -{' '}
          {work.endDate
            ? format(parseISO(work.endDate), 'MMM yyyy')
            : 'Present'}
          {' • '}
          {getDuration(work.startDate, work.endDate)}
        </span>
        <span>{work.location}</span>
      </MetaInfo>

      {work.highlights && work.highlights.length > 0 && (
        <Highlights>
          {work.highlights.map((item, index) => (
            <HighlightItem key={index}>✨ {item}</HighlightItem>
          ))}
        </Highlights>
      )}

      <Description>
        {work.description?.map((item, index) => (
          <DescriptionItem
            key={index}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </Description>

      {work.technologies && work.technologies.length > 0 && (
        <TechStack>
          <TechTitle>Technologies</TechTitle>
          <TechList>
            {work.technologies.map((tech, idx) => (
              <TechItem key={idx}>{tech}</TechItem>
            ))}
          </TechList>
        </TechStack>
      )}

      {work.companyUrl && (
        <Link href={work.companyUrl} target="_blank" rel="noopener noreferrer">
          Visit Company Website →
        </Link>
      )}
    </Modal>
  )
}

const Header = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '30px',
  gap: '25px',
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
  textAlign: 'center',
})

const Title = styled('h1', {
  fontSize: '24px',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 4px 0',
  lineHeight: 1.3,
  wordBreak: 'break-word',
})

const Company = styled('h2', {
  fontSize: '18px',
  fontWeight: '400',
  color: '$secondary',
  margin: 0,
  lineHeight: 1.4,
  wordBreak: 'break-word',
})

const RoleType = styled('p', {
  fontSize: '14px',
  fontStyle: 'italic',
  color: '$highlight',
  marginTop: '4px',
})

const MetaInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '10px',
  borderTop: '1px solid $hover',
  borderBottom: '1px solid $hover',
  marginTop: '20px',
  marginBottom: '20px',
  fontSize: '14px',
  color: '$secondary',
  lineHeight: 1.5,

  '@bp1': {
    flexDirection: 'row',
  },
})

const Description = styled('div', {
  color: 'white',
  fontSize: '16px',
  lineHeight: 1.7,
})

const DescriptionItem = styled('p', {
  margin: '0 0 12px 0',
  paddingLeft: '20px',
  position: 'relative',
  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: '0',
    color: '$primary',
    fontWeight: 'bold',
  },
})

const Highlights = styled('div', {
  backgroundColor: '$hover',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '20px',
})

const HighlightItem = styled('p', {
  fontSize: '14px',
  margin: '0 0 8px 0',
  color: '$highlight',
})

const TechStack = styled('div', {
  marginTop: '30px',
})

const TechTitle = styled('h3', {
  color: '$primary',
  fontSize: '16px',
  marginBottom: '10px',
})

const TechList = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
})

const TechItem = styled('span', {
  backgroundColor: '$hover',
  color: '$primary',
  fontSize: '13px',
  padding: '6px 12px',
  borderRadius: '999px',
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
