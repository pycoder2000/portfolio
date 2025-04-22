import React from 'react'
import { format, parseISO } from 'date-fns'
import { styled } from '../../stitches.config'
import Modal from '../modal/Modal'

export default function WorkModal({ work, isOpen, onClose, getDuration }) {
  if (!work) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <ModalHeader>
          <ModalLogo src={work.companyLogo} alt={`${work.company} logo`} />
          <HeaderContent>
            <ModalTitle>{work.jobTitle}</ModalTitle>
            <ModalCompany>{work.company}</ModalCompany>
          </HeaderContent>
        </ModalHeader>

        <InfoSection>
          <ModalDates>
            {format(parseISO(work.startDate), 'MMM yyyy')} -{' '}
            {work.endDate
              ? format(parseISO(work.endDate), 'MMM yyyy')
              : 'Present'}{' '}
            · {getDuration(work.startDate, work.endDate)}
          </ModalDates>

          <ModalLocation>{work.location}</ModalLocation>
        </InfoSection>

        <DescriptionList>
          {work.description &&
            work.description.map((item, index) => (
              <DescriptionItem key={index}>• {item}</DescriptionItem>
            ))}
        </DescriptionList>

        {work.companyUrl && (
          <CompanyLink
            href={work.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit company website →
          </CompanyLink>
        )}
      </Container>
    </Modal>
  )
}

const Container = styled('div', {
  padding: '20px',
  color: '$primary',
  maxWidth: '800px',
  width: '100%',
})

const ModalHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  textAlign: 'left',
})

const ModalLogo = styled('img', {
  width: '60px',
  height: '60px',
  objectFit: 'contain',
  marginRight: '20px',
})

const HeaderContent = styled('div', {
  textAlign: 'left',
})

const ModalTitle = styled('h1', {
  fontSize: '28px',
  margin: '0 0 5px 0',
  color: 'white',
  fontWeight: 'bold',
})

const ModalCompany = styled('h2', {
  fontSize: '20px',
  margin: 0,
  color: '$secondary',
  fontWeight: 'normal',
})

const InfoSection = styled('div', {
  marginBottom: '20px',
  textAlign: 'left',
})

const ModalDates = styled('div', {
  color: 'white',
  fontSize: '14px',
  marginBottom: '5px',
})

const ModalLocation = styled('div', {
  color: 'white',
  fontSize: '14px',
})

const DescriptionList = styled('div', {
  marginTop: '30px',
  marginBottom: '30px',
  textAlign: 'left',
  paddingLeft: '10px',
})

const DescriptionItem = styled('p', {
  color: 'white',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
  paddingLeft: '10px',
  position: 'relative',
})

const CompanyLink = styled('a', {
  color: '$primary',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
})
