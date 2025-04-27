import Head from 'next/head'
import React from 'react'
import categories from '../data/uses'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { motion } from 'framer-motion'

export async function getStaticProps() {
  const meta = {
    title: 'Uses // Parth Desai',
    description:
      "This is a comprehensive list of all the <strong>software or hardware</strong> that I use daily along with my dotfiles configurations.",
    tagline: 'Tools. Apps. Gear.',
    image: '/static/images/uses-bw.jpg',
    primaryColor: 'yellow',
    secondaryColor: 'pink',
  }

  return { props: meta }
}

function Uses(props) {
  const { title, description, image } = props

  const renderAll = () => {
    return categories.map((category, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.08,
          duration: 0.5,
          type: 'spring',
          stiffness: 60,
        }}
      >
        <h2>{category.name}</h2>
        <ul>
          {category.items.map((item, iIndex) => (
            <motion.li
              key={iIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: iIndex * 0.05,
                duration: 0.4,
                type: 'spring',
                stiffness: 60,
              }}
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <span> - </span>
              <span dangerouslySetInnerHTML={{ __html: item.description }} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ))
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/uses" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <p dangerouslySetInnerHTML={{ __html: description }} />

      {renderAll()}
    </>
  )
}

Uses.Layout = Base

export default Uses
