import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import ShortcutHome from '../components/ShortcutHome'
import { motion } from 'framer-motion'
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

function RollingText({ companies, isPaused }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)

  useEffect(() => {
    let timer
    if (!isPaused) {
      // Only set timer if not paused
      timer = setTimeout(() => {
        setPrevIndex(currentIndex)
        setCurrentIndex((currentIndex + 1) % companies.length)
      }, 1000)
    }
    return () => clearTimeout(timer) // Clear timer on unmount or if isPaused changes
  }, [currentIndex, companies.length, isPaused]) // Add isPaused to dependency array

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
        <AnimatedSpan
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
        </AnimatedSpan>
      )}

      <AnimatedSpan
        key={currentIndex}
        animationType="enter"
        css={{ color: companies[currentIndex].color }}
      >
        {companies[currentIndex].name}
      </AnimatedSpan>
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
  '0%': { opacity: 0, transform: 'translateY(20px)' },
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
              <GradientHeading
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {title}
              </GradientHeading>
              <LargeText
                as={motion.p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <LargeStrong
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  Data Engineer at{' '}
                  <AnimatedCompany
                    companies={companies}
                    isPaused={isHovering}
                    animationType="enter"
                  >
                    <RollingText companies={companies} isPaused={isHovering} />
                  </AnimatedCompany>
                </LargeStrong>
                <br />
                {description}
              </LargeText>
              <ShortcutHome />
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const LargeText = styled('p', {
  margin: '24px 0',
  color: '$secondary',
  fontSize: '18px',
})

const LargeStrong = styled('strong', {
  color: '$primary',
  fontWeight: 500,
  fontSize: '20px',
})

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})

const GradientHeading = styled(motion.h1, {
  fontFamily: '$heading',
  fontSize: '64px',
  lineHeight: '1.1',
  margin: '0 0 24px',
  background: 'linear-gradient(90deg, #80ffea, #9580ff, #ff80bf)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: '-2px',
  textShadow: '0 2px 24px #0008',
})

const AnimatedCompany = styled(AnimatedSpan, {
  animation: 'float 2.5s ease-in-out infinite alternate',
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-10px)' },
  },
})
