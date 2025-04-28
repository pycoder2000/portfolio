import { AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import ListItem from '../components/ListItem'
import Base from '../layouts/Base'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('end-to-end-streaming-pipeline.md', featuredParams),
    getPostBySlug('curiosity-cost-to-company.md', featuredParams),
  ]

  return {
    props: {
      title: 'Articles // Parth Desai',
      tagline: 'Stories. Experiences. Musings.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => (
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
        <FeaturedArticle
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      </motion.div>
    ))
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
            key={index}
            animationIndex={index}
          />
        )
      }
      return null
    })
  }

  const { title, image } = props
  const description = `Here you can find all <strong>${props.allPosts.length} articles</strong> that I've written. My writing primarily covers topics related to technology, conferences, my personal experiences, and my thoughts.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/articles" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Articles</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        <h2>All Articles</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Articles.Layout = Base

export default Articles
