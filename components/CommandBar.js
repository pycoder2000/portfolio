import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { forwardRef, useRef, useState } from 'react'
import aboutIcon from '../public/static/icons/about.json'
import articlesIcon from '../public/static/icons/articles.json'
import connectionsIcon from '../public/static/icons/connections.json'
import copyLinkIcon from '../public/static/icons/copy-link.json'
import creditsIcon from '../public/static/icons/credits.json'
import emailIcon from '../public/static/icons/email.json'
import homeIcon from '../public/static/icons/home.json'
import projectsIcon from '../public/static/icons/projects.json'
import sourceIcon from '../public/static/icons/source.json'
import tweetsIcon from '../public/static/icons/tweets.json'
import usesIcon from '../public/static/icons/uses.json'
import workIcon from '../public/static/icons/work.json'
import { styled } from '../stitches.config'
import { Box } from './Box'
import Toast from './Toast'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function CommandBar(props) {
  const copyLinkRef = useRef()
  const emailRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const aboutRef = useRef()
  const articlesRef = useRef()
  const projectsRef = useRef()
  const workRef = useRef()
  const podcastsRef = useRef()
  const investingRef = useRef()
  const tweetsRef = useRef()
  const usesRef = useRef()
  const connectionsRef = useRef()
  const creditsRef = useRef()
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: (
        <Lottie
          lottieRef={copyLinkRef}
          style={iconSize}
          animationData={copyLinkIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'email',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => router.push('/contact'),
      icon: (
        <Lottie
          lottieRef={emailRef}
          style={iconSize}
          animationData={emailIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/pycoder2000/portfolio', '_blank'),
      icon: (
        <Lottie
          lottieRef={sourceRef}
          style={iconSize}
          animationData={sourceIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: (
        <Lottie
          lottieRef={homeRef}
          style={iconSize}
          animationData={homeIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: (
        <Lottie
          lottieRef={aboutRef}
          style={iconSize}
          animationData={aboutIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => router.push('/articles'),
      icon: (
        <Lottie
          lottieRef={articlesRef}
          style={iconSize}
          animationData={articlesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: (
        <Lottie
          lottieRef={projectsRef}
          style={iconSize}
          animationData={projectsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'work',
      name: 'Work',
      shortcut: ['g', 'w'],
      keywords: 'go-work',
      section: 'Go To',
      perform: () => router.push('/work'),
      icon: (
        <Lottie
          lottieRef={workRef}
          style={iconSize}
          animationData={workIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    // {
    //   id: 'podcasts',
    //   name: 'Podcasts',
    //   shortcut: ['g', 'c'],
    //   keywords: 'go-podcasts',
    //   section: 'Go To',
    //   perform: () => router.push('/podcasts'),
    //   icon: (
    //     <Lottie
    //       lottieRef={podcastsRef}
    //       style={iconSize}
    //       animationData={podcastsIcon}
    //       loop={false}
    //       autoplay={false}
    //     />
    //   ),
    // },
    // {
    //   id: 'investing',
    //   name: 'Investing',
    //   shortcut: ['g', 'i'],
    //   keywords: 'go-investing',
    //   section: 'Go To',
    //   perform: () => router.push('/investing'),
    //   icon: (
    //     <Lottie
    //       lottieRef={investingRef}
    //       style={iconSize}
    //       animationData={investingIcon}
    //       loop={false}
    //       autoplay={false}
    //     />
    //   ),
    // },
    {
      id: 'tweets',
      name: 'Tweets',
      shortcut: ['g', 't'],
      keywords: 'go-tweets',
      section: 'Go To',
      perform: () => router.push('/tweets'),
      icon: (
        <Lottie
          lottieRef={tweetsRef}
          style={iconSize}
          animationData={tweetsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'uses',
      name: 'Uses',
      shortcut: ['g', 'u'],
      keywords: 'go-uses',
      section: 'Go To',
      perform: () => router.push('/uses'),
      icon: (
        <Lottie
          lottieRef={usesRef}
          style={iconSize}
          animationData={usesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'connections',
      name: 'Connections',
      shortcut: ['g', 'c'],
      keywords: 'go-connections',
      section: 'Go To',
      perform: () => router.push('/connections'),
      icon: (
        <Lottie
          lottieRef={connectionsRef}
          style={iconSize}
          animationData={connectionsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'credits',
      name: 'Credits',
      shortcut: ['g', 'r'],
      keywords: 'go-credits',
      section: 'Go To',
      perform: () => router.push('/credits'),
      icon: (
        <Lottie
          lottieRef={creditsRef}
          style={iconSize}
          animationData={creditsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
  ]

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <Positioner>
            <Animator>
              <Search placeholder="Type a command or search…" />
              <RenderResults />
            </Animator>
          </Positioner>
        </KBarPortal>

        {props.children}
      </KBarProvider>

      <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = forwardRef(({ action, active }, ref) => {
  if (active) {
    action.icon.props.lottieRef.current?.play()
  } else {
    action.icon.props.lottieRef.current?.stop()
  }

  return (
    <Box
      ref={ref}
      css={getResultStyle(active)}
      onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
      onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
    >
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map(shortcut => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  )
})

ResultItem.displayName = 'ResultItem'

const Positioner = styled(KBarPositioner, {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
})

const Search = styled(KBarSearch, {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '$command',
  color: '$primary',
})

const GroupName = styled('div', {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  background: '$command',
})

const Kbd = styled('kbd', {
  background: 'rgba(255, 255, 255, .1)',
  color: '$secondary',
  padding: '4px 8px',
  textTransform: 'uppercase',
})

const Shortcut = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '4px',
})

const Action = styled('div', {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
})

const ActionRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const Animator = styled(KBarAnimator, {
  backgroundColor: '#1a1c1e',
  maxWidth: '600px',
  width: '100%',
  color: '$primary',
  borderRadius: '8px',
  overflow: 'hidden',
  '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
    backgroundColor: '$command',
    WebkitBackdropFilter: 'saturate(300%) blur(25px)',
    backdropFilter: 'saturate(300%) blur(25px)',
  },

  /* Hide scrollbar for Chrome, Safari and Opera */
  '& > div > div::-webkit-scrollbar': {
    display: 'none',
  },

  /* Hide scrollbar for IE, Edge and Firefox */
  '& > div > div': {
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
})

const getResultStyle = active => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  }
}
