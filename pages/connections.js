import { Client } from '@notionhq/client'
import { AnimateSharedLayout, motion } from 'framer-motion'
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

  return response.results.map(page => {
    const props = page.properties

    return {
      name: props.Name?.title?.[0]?.plain_text?.trim() || 'Unknown',
      company: props.Company?.select?.name?.trim() || 'Unknown',
      title: props.Title?.select?.name?.trim() || 'Unknown',
      location: props.Location?.select?.name?.trim() || 'Unknown',
      status: props.Status?.select?.name?.trim() || 'Unknown',
      tags: Array.isArray(props.Tags?.multi_select)
        ? props.Tags.multi_select.map(tag => tag.name)
        : [],
      metOn: props['Met On']?.date?.start || null,
      linkedin: props['LinkedIn']?.url || null,
      twitter: props.Twitter?.url || null,
      notes: props.Notes?.rich_text?.[0]?.plain_text?.trim() || null,
      url: page.url || null,
    }
  })
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
    revalidate: 60 * 60 * 24,
  }
}

function Connections({
  title,
  tagline,
  image,
  primaryColor,
  secondaryColor,
  connections,
}) {
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

  const description = `A curated list of <strong>interesting people</strong> I’ve met or hope to meet. If you’d like to connect or collaborate, feel free to <a href="/contact">reach out to me</a>. This page is powered by an ever-evolving <a href="https://desaiparth.notion.site/1e1166c4dbed80f5871ec01ee6b182a0?v=1e1166c4dbed80e68890000c5c1875e6&pvs=4" target="_blank" rel="noopener noreferrer">Notion database</a>.`

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
            <motion.div
              key={person.name + idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.5,
                type: 'spring',
                stiffness: 60,
              }}
            >
              <ConnectionCard
                person={person}
                onClick={() => handleCardClick(person)}
              />
            </motion.div>
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
