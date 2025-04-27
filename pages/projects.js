import { AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import React from 'react'
import FeaturedProject from '../components/FeaturedProject'
import { FeaturedProjects } from '../components/FeaturedProjects'
import items from '../data/projects'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Parth Desai',
    tagline: 'Work. Hobby. Open Source.',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function ProjectItem({ project, pIndex }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: pIndex * 0.05,
        duration: 0.4,
        type: 'spring',
        stiffness: 60,
      }}
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    </motion.li>
  )
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = ['GRE Prep Tool', 'Stocker', 'Musing', 'Instant MD']

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => item.length > 0)
      .flat()
      .map((item, index) => (
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
          <FeaturedProject project={item} />
        </motion.div>
      ))
  }

  const renderAll = () => {
    return items.map((item, index) => (
      <div key={index}>
        <h3>{item.year}</h3>
        <ul>
          {item.projects.map((project, pIndex) => (
            <ProjectItem project={project} pIndex={pIndex} key={pIndex} />
          ))}
        </ul>
      </div>
    ))
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `I love building <strong>side projects</strong>. Here you can navigate to all <strong>${getTotalProjects()} projects</strong> that I have built.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/projects" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>

        <FeaturedProjects>{renderFeatured()}</FeaturedProjects>

        <h2>All Projects</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </>
  )
}

Projects.Layout = Base

export default Projects
