import Head from 'next/head'
import React from 'react'
import TweetEmbed from 'react-tweet-embed'
import tweets from '../data/tweets'
import Base from '../layouts/Base'

export async function getStaticProps() {
  const meta = {
    title: 'Tweets // Parth Desai',
    description: 'A collection of my tweets.',
    tagline: 'Tweets. Thoughts. Insights.',
    image: '/static/images/tweets-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function TweetsPage(props) {
  const { title, description, image } = props

  const renderTweets = () => {
    return tweets.map((tweetId, index) => (
      <TweetEmbed key={index} tweetId={tweetId} options={{ theme: 'dark' }} />
    ))
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://parthdesai.site/tweets" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <p>{description}</p>

      <h2>My Tweets</h2>
      <div>{renderTweets()}</div>

      <h2>Let's chat</h2>
      <p>Hit me up if what you read here resonates with you.</p>
    </>
  )
}

TweetsPage.Layout = Base

export default TweetsPage
