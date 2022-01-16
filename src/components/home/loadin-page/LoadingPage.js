import React, { useEffect } from 'react'
import { StylesProvider, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './LoadingPage.css'
import students from './images/student.png'
import img1 from './images/icon-online.svg'
import img2 from './images/icon-budgeting.svg'
import img3 from './images/icon-api.svg'
import img4 from './images/icon-online.svg'
import img5 from './images/party.png'
import img6 from './images/party2.jpg'

function LoadingPage({
  account = 0x5df598c222c4a7e8e4ab9f347dcbd924b6458382,
  contractData,
}) {
  useEffect(() => {
    console.log('contractData', contractData)
    const loadCommunity = async () => {
      try {
        // pass the cid
        const cid = 'QmTFaLUesrjbQLKxNszz2DWZ33N9YuGBSVCLpwXnvyiumz'

        let fileData = await fetch(`https://ipfs.io/ipfs/${cid}`)

        const yourData = await fileData.json()
        console.log(yourData)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommunity()

    //
    const getCommunityList = async () => {
      try {
        // gets communityCount from chain
        const count = await contractData.methods.count().call()
        console.log('count', count)

        // gets community data
        const temp = []
        for (let i = count; i >= 1; i--) {
          const community = await contractData.methods.communityList(i).call()
          temp.push(community)
        }
        console.log(temp)

        // setCommunities(temp)
      } catch (error) {
        console.log(error)
        // setLoading(false)
      }
    }
    getCommunityList()
    //
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container>
        <section className="hero" role="banner">
          <div className="container">
            <div className="hero__text container--pall">
              <h1>Protect your ideas, work, projects and more.</h1>
              <p>
                We help students, professors, and anyone to protect their
                intellectual ideas through a decentralized and transparent way
                using blockchain technology to document their journey from start
                to finish.
              </p>
              <Link to="/projects" className="button-gren-padding hero_cta">
                Get Started
              </Link>
            </div>

            <div className="hero__image">
              <img src={img6} alt="" className="student__image" />
            </div>
          </div>
        </section>

        <section className="feature" role="main">
          <div className="feature__content container container--pall">
            <div className="feature__intro">
              <h2>How does it work?</h2>
              <p>
                It's a simple process, just come up with a project/idea, start
                building, and get fund it. Make your dream come true and let the
                world discover your talent.
              </p>
            </div>

            <div className="feature__grid">
              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img1} alt="online" />
                </div>
                <div className="feature__title">
                  Share your idea with the world
                </div>
                <div className="feature__description">
                  Share your awesome idea, project, research, or mission so
                  others can financially support or contribute.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img2} alt="budgeting" />
                </div>
                <div className="feature__title">Get a Non Fungible Token</div>
                <div className="feature__description">
                  Each idea is represented as an NFT that holds your valuable
                  work and idea.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img3} alt="api" />
                </div>
                <div className="feature__title">
                  Find contributors, investors, and mentors.
                </div>
                <div className="feature__description">
                  Invite people, makers, mentors, and expert advisors to your
                  project. Anyone can see ideas, but only members who purchase
                  your idea NFT can access the community.
                </div>
              </div>

              <div className="feature__item">
                <div className="feature__icon">
                  <img src={img4} alt="online" />
                </div>
                <div className="feature__title">Get fund it</div>
                <div className="feature__description">
                  Offer potential funders incentives to invest in your idea.
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </StylesProvider>
  )
}

export default LoadingPage
