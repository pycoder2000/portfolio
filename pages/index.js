import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import ShortcutHome from '../components/ShortcutHome'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'
import { keyframes, styled } from '../stitches.config'

export async function getStaticProps() {
  return {
    props: {
      title: 'Parth Desai',
      description: 'Obsessed with data',
      image: '/static/images/home-bw.jpg',
    },
  }
}

function RollingText({ companies, ispaused }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)

  useEffect(() => {
    let timer
    if (!ispaused) {
      timer = setTimeout(() => {
        setPrevIndex(currentIndex)
        setCurrentIndex((currentIndex + 1) % companies.length)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [currentIndex, companies.length, ispaused])

  useEffect(() => {
    if (prevIndex !== null) {
      const clearTimer = setTimeout(() => {
        setPrevIndex(null)
      }, 500)
      return () => clearTimeout(clearTimer)
    }
  }, [prevIndex])

  return (
    <Container>
      {prevIndex !== null && (
        <AnimatedCompanyText
          key={prevIndex}
          animationType="exit"
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: companies[prevIndex].color,
          }}
        >
          {companies[prevIndex].name}
        </AnimatedCompanyText>
      )}

      <AnimatedCompanyText
        key={currentIndex}
        animationType="enter"
        css={{ color: companies[currentIndex].color }}
      >
        {companies[currentIndex].name}
      </AnimatedCompanyText>
    </Container>
  )
}

const Container = styled('span', {
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'bottom',
})

const scrollIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(18px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const scrollOut = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(-10px)' },
})

const AnimatedSpan = styled('span', {
  display: 'inline-block',
  willChange: 'opacity, transform',
  variants: {
    animationType: {
      enter: {
        animation: `${scrollIn} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
      },
      exit: {
        animation: `${scrollOut} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
      },
    },
  },
})

export default function Index(props) {
  const { title, description, image } = props
  const [isHovering, setIsHovering] = useState(false)
  const companies = [
    { name: 'Netflix', color: '#E50914' },
    { name: 'Accenture', color: '#A100FF' },
    { name: 'Glassdoor', color: '#0CAA41' },
  ]

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://parthdesai.site" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
          key="person-jsonld"
        />
      </Head>
      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <MotionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {title}
            </MotionTitle>
            <MotionLead
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <strong
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ position: 'relative', zIndex: 2 }}
              >
                Data Engineer at{' '}
                <AnimatedCompany
                  companies={companies}
                  data-ispaused={isHovering}
                  animationType="enter"
                >
                  <RollingText companies={companies} ispaused={isHovering} />
                </AnimatedCompany>
              </strong>
              <br />
              <span style={{ display: 'block', marginTop: 5 }}>
                {description}
              </span>
            </MotionLead>
            <div style={{ marginTop: 12 }}>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})

const AnimatedCompany = styled(AnimatedSpan, {
  animation: 'float 2.5s ease-in-out infinite alternate',
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-10px)' },
  },
})

const Title = styled('h1', {
  fontSize: '40px',
  lineHeight: '1.05',
  margin: '0 0 12px 0',
  '@bp2': { fontSize: '74px' },
})

const Lead = styled('p', {
  fontSize: '11px',
  lineHeight: '1.4',
  margin: 0,
  '@bp2': { fontSize: '18px' },
})

const MotionTitle = motion(Title)
const MotionLead = motion(Lead)

const AnimatedCompanyText = styled(AnimatedSpan, {
  fontSize: '18px',
  '@bp2': { fontSize: '18px' },
})
