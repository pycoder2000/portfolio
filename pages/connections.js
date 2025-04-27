import { Client } from '@notionhq/client'
import { AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import ConnectionCard from '../components/connections/ConnectionCard'
import ConnectionModal from '../components/connections/ConnectionModal'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getConnections() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const databaseId = process.env.NOTION_DATABASE_ID

  const response = await notion.databases.query({
    database_id: databaseId,
  })

  return response.results.map(page => ({
    name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
    company: page.properties.Company?.rich_text[0]?.plain_text || 'Unknown',
    title: page.properties.Title?.rich_text[0]?.plain_text || 'Unknown',
    location: page.properties.Location?.rich_text[0]?.plain_text || 'Unknown',
    status: page.properties.Status?.select?.name || 'Unknown',
    tags: page.properties.Tags?.multi_select.map(tag => tag.name) || [],
    metOn: page.properties['Met On']?.date?.start || null,
    linkedin: page.properties.Linkedin?.url || null,
    twitter: page.properties.Twitter?.url || null,
    notes: page.properties.Notes?.rich_text[0]?.plain_text || null,
  }))
}

export function getMeta() {
  return {
    title: 'Connections // Parth Desai',
    tagline: 'People. Inspiration. Networking.',
    image: '/static/images/connections-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }
}

export async function getStaticProps() {
  const connections = await getConnections()
  const meta = getMeta()

  return {
    props: {
      title: meta.title,
      tagline: meta.tagline,
      image: meta.image,
      primaryColor: meta.primaryColor,
      secondaryColor: meta.secondaryColor,
      connections,
    },
  }
}

function Connections({ title, tagline, image, primaryColor, secondaryColor, connections }) {
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
