// components/MobileNavbar.js
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
      <NavBarInner>
        {navItems.map(item => (
          <Link href={item.path} passHref key={item.path}>
            <NavItem active={router.pathname === item.path}>
              <Lottie
                animationData={item.icon}
                style={{ width: 22, height: 22 }}
                loop={false}
                autoplay={router.pathname === item.path}
              />
            </NavItem>
          </Link>
        ))}
      </NavBarInner>
    </NavBarContainer>
  )
}

const NavBarContainer = styled('nav', {
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '92%',
  maxWidth: '500px',
  background: '#101111',
  borderRadius: '16px',
  zIndex: 50,
  padding: '8px 0',
  '@bp2': { display: 'none' },
})

const NavBarInner = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '4px',
  alignItems: 'center',
})

const NavItem = styled('a', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px',
  borderRadius: '10px',
  border: 'none',
  textDecoration: 'none',
  transition: 'background 0.2s ease-in-out',
  variants: {
    active: {
      true: { backgroundColor: '#18191b' },
      false: { backgroundColor: 'transparent' },
    },
  },
})
