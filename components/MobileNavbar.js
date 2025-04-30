import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '../stitches.config'

import aboutIcon from '../public/static/icons/about.json'
import articlesIcon from '../public/static/icons/articles.json'
import connectionsIcon from '../public/static/icons/connections.json'
import emailIcon from '../public/static/icons/email.json'
import projectsIcon from '../public/static/icons/projects.json'
import tweetsIcon from '../public/static/icons/tweets.json'
import usesIcon from '../public/static/icons/uses.json'
import workIcon from '../public/static/icons/work.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const navItems = [
  { path: '/about', icon: aboutIcon, label: 'About' },
  { path: '/articles', icon: articlesIcon, label: 'Articles' },
  { path: '/projects', icon: projectsIcon, label: 'Projects' },
  { path: '/work', icon: workIcon, label: 'Work' },
  { path: '/uses', icon: usesIcon, label: 'Uses' },
  { path: '/tweets', icon: tweetsIcon, label: 'Tweets' },
  { path: '/connections', icon: connectionsIcon, label: 'Connections' },
  { path: '/contact', icon: emailIcon, label: 'Contact' },
]

export default function MobileNavbar() {
  const router = useRouter()

  return (
    <NavBarContainer>
      {navItems.map(item => (
        <Link href={item.path} passHref key={item.path}>
          <NavItem active={router.pathname === item.path}>
            <Lottie
              animationData={item.icon}
              style={{ width: 28, height: 28 }}
              loop={false}
              autoplay={router.pathname === item.path}
            />
          </NavItem>
        </Link>
      ))}
    </NavBarContainer>
  )
}

const NavBarContainer = styled('nav', {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px 0',
  background: '#000',
  borderTop: '1px solid #222',
  zIndex: 50,
  borderRadius: '16px 16px 0 0',
  '@bp2': { display: 'none' },
})

const NavItem = styled('a', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px',
  borderRadius: '12px',
  variants: {
    active: {
      true: { backgroundColor: '#111' },
      false: { backgroundColor: 'transparent' },
    },
  },
})
