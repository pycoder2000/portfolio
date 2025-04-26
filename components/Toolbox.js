import { motion } from 'framer-motion'
import {
  SiAmazonwebservices,
  SiApacheairflow,
  SiApacheflink,
  SiApachekafka,
  SiApachespark,
  SiKubernetes,
  SiMysql,
  SiPython,
  SiScala,
  SiSnowflake,
} from 'react-icons/si'
import { styled } from '../stitches.config'

const tools = [
  { name: 'SQL', icon: SiMysql, color: '#61DAFB' },
  { name: 'Scala', icon: SiScala, color: '#F7DF1E' },
  { name: 'Kafka', icon: SiApachekafka, color: '#3178C6' },
  { name: 'Spark', icon: SiApachespark, color: '#000000' },
  { name: 'Airflow', icon: SiApacheairflow, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#1572B6' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#06B6D4' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#F24E1E' },
  { name: 'Flink', icon: SiApacheflink, color: '#007ACC' },
  { name: 'Snowflake', icon: SiSnowflake, color: '#FF6C37' },
]

export default function Toolbox() {
  return (
    <ToolboxContainer>
      <h2>My Toolbox</h2>
      <ToolGrid>
        {tools.map((tool, index) => {
          if (!tool.icon) return null
          const IconComponent = tool.icon
          return (
            <Tool key={index} whileHover={{ scale: 1.1 }}>
              <IconWrapper style={{ color: tool.color }}>
                <IconComponent size={40} />
              </IconWrapper>
              <ToolName>{tool.name}</ToolName>
            </Tool>
          )
        })}
      </ToolGrid>
    </ToolboxContainer>
  )
}

const ToolboxContainer = styled('div', {
  marginTop: '2rem',
})

const ToolGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '2rem',
  marginTop: '2rem',
})

const Tool = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  borderRadius: '12px',
  background: '$hover',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: '$background',
  },
})

const IconWrapper = styled('div', {
  fontSize: '2.5rem',
  marginBottom: '0.5rem',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease',
  '& svg': {
    transition: 'transform 0.3s ease',
  },
  '&:hover svg': {
    transform: 'rotate(360deg)',
  },
})

const ToolName = styled('span', {
  fontSize: '0.9rem',
  color: '$secondary',
  textAlign: 'center',
})
