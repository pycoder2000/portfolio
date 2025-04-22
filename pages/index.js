import Head from 'next/head'
import React, { useEffect, useState } from 'react'
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

function RollingText({ companies }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(currentIndex)
      setCurrentIndex((currentIndex + 1) % companies.length)
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentIndex, companies.length])

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
            <div>
              <LargeHeading>{title}</LargeHeading>
              <LargeText>
                <LargeStrong>
                  Data Engineer at <RollingText companies={companies} />
                </LargeStrong>
                <br />
                {description}
              </LargeText>
              <ShortcutHome />
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer />
    </Wrapper>
  )
}

const LargeHeading = styled('h1', {
  fontFamily: '$heading',
  fontSize: '60px',
  lineHeight: '62px',
  margin: '0 0 24px',
  color: '$primary',
})

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
