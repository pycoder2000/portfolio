import Router from 'next/router'
import AnimatedCursor from 'react-animated-cursor'
import { isMobile } from 'react-device-detect'
import 'remixicon/fonts/remixicon.css'
import CommandBar from '../components/CommandBar'
import * as gtag from '../lib/gtag'
import '../public/static/css/prism.css'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  return (
    <CommandBar>
      {!isMobile && (
        <AnimatedCursor
          innerSize={13}
          outerSize={25}
          color="255, 255, 255"
          outerAlpha={0.2}
          innerScale={1.2}
          outerScale={1.8}
          trailingSpeed={4}
          clickables={[
            'a',
            'button',
            '.link',
            '.link-button',
            '.cursor-pointer',
            '.cursor-text',
            '[tabindex]',
          ]}
        />
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBar>
  )
}
