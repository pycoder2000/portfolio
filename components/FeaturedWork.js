import { motion } from 'framer-motion'
import { useState } from 'react'
import { styled } from '../stitches.config'

export default function FeaturedWork(props) {
  const { work } = props

  return (
    <Work>
      <Animation index={props.index}>
        <Content>
          <div>
            <Title css={{ margin: 0 }}>{work.jobTitle}</Title>
            <Paragraph>{work.company}</Paragraph>
          </div>
        </Content>
      </Animation>
    </Work>
  )
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredwork"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {props.children}
    </AnimContainer>
  )
}

const Work = styled('a', {
  marginTop: 20,
  border: 0,
  textDecoration: 'none',
  '&:first-child': { marginLeft: 0 },
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
})

const Title = styled('h3', {
  color: '$primary',
  fontSize: '18px',
  margin: '0',
})

const Paragraph = styled('p', {
  color: '$secondary',
  margin: '0',
})

const AnimContainer = styled(motion.div, {
  padding: '20px',
  position: 'relative',
  width: '100%',
})

const AnimHovered = styled(motion.div, {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: '$hover',
  borderRadius: '$borderRadius',
  zIndex: -1,
})
