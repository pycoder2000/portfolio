import { AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import ConnectionCard from '../components/connections/ConnectionCard'
import ConnectionModal from '../components/connections/ConnectionModal'
import connections from '../data/connections.json'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: 'Connections // Parth Desai',
    tagline: 'People. Inspiration. Networking.',
    image: '/static/images/connections-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Connections(props) {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = person => {
    setSelectedPerson(person)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPerson(null)
  }

  const { title, image } = props
  const description = `A curated list of <strong>interesting people</strong> I’ve met or hope to meet.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/connections" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Connections</h2>
        <ConnectionsGrid>
          {connections.map((person, idx) => (
            <ConnectionCard
              key={person.name + idx}
              person={person}
              onClick={() => handleCardClick(person)}
            />
          ))}
        </ConnectionsGrid>
      </AnimateSharedLayout>
      <ConnectionModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}

Connections.Layout = Base

export default Connections

const ConnectionsGrid = styled('div', {
  display: 'grid',
  margin: '10px 0 0 -20px',
  gridTemplateColumns: 'repeat(4, 1fr)',
})
