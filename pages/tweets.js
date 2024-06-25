import Head from 'next/head'
import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
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
  const [loading, setLoading] = useState(true)

  const handleTweetLoad = () => {
    setLoading(false)
  }

  const renderTweets = () => {
    return tweets.map((tweetId, index) => (
      <TweetEmbed
        key={index}
        tweetId={tweetId}
        options={{ theme: 'dark' }}
        onTweetLoadSuccess={handleTweetLoad}
      />
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

      {/* {loading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#5D3FD3"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      )} */}

      <p>{description}</p>

      <h2>My Tweets</h2>
      <div style={{ position: 'relative' }}>
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#5D3FD3"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          </div>
        )}

        <div>{renderTweets()}</div>
      </div>
      <h2>Let's chat</h2>
      <p>
        <a href="https://www.parthdesai.site/contact" target="_blank">
          Hit me up
        </a>{' '}
        if what you read here resonates with you.
      </p>
    </>
  )
}

TweetsPage.Layout = Base

export default TweetsPage
