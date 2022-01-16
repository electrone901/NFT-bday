import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PageCommunity.css'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  ImageListItem,
  Grid,
  Box,
  Card,
} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
// import { apiKey } from '../../../APIKEYS'
import CircularStatic from '../../commons/CircularProgressWithLabel'
import roadmap from '../../../images/roadmap.png'
import roadmap2 from '../../../images/project.jpg'

// import community1 from '../../../images/communities/0.jpeg'
// import PetGallery from '../../home-container/gallery/PetGallery'

function PageCommunity({ account }) {
  const { projectId } = useParams()
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState('')
  const [projectWallet, setProjectWallet] = useState('')
  const [userHistory, setUserHistory] = useState([])
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'

  const loadMyCollection = async () => {
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
    try {
      const historyResult = await fetch(
        `https://api.covalenthq.com/v1/137/address/${userWallet}/balances_v2/?nft=true&key=${covalentAPI}`,
      )
      // json address & items listing all erc20 or 21
      const { data } = await historyResult.json()
      console.log('🚀🚀🚀data', data)

      if (data) {
        setUserHistory(data.items[0].nft_data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(true)
      console.error(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    if (userWallet) loadMyCollection()

    // sets winnerNum
    // setWinningNumber(Math.ceil(Math.random() * 20))

    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    // const resetGame = () => {
    //   window.location.reload()
    // }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${projectId}/metadata.json`)
      data = await data.json()

      data.image = await getImage(data.image)
      const info = data.description.split(',')
      data.description = info[0]
      data.category = info[1]
      data.wallet = info[2]
      setProjectWallet(info[2])
      setProject(data)
      // const [petOwner, petCategory] = data.description.split(',')
      // const imageFormated = getImage(data.image)
      // setPetImage(imageFormated)
      // setPetName(data.name)
      // setOwnerName(petOwner)
      // setPetCategory(petCategory)
    }

    if (projectId) {
      getMetadata()
      getImage()
    }
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container
        className="page-community"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <div>
          {/* Grid  */}
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography className="title" color="textPrimary" gutterBottom>
                  {project.name}
                </Typography>
                <ImageListItem
                  style={{ height: '300px', width: '450px', listStyle: 'none' }}
                >
                  <img src={project.image} alt="community" />
                </ImageListItem>
              </Grid>

              <Grid p xs={6} className="grid-rigth-side">
                <div className="page-wallet-address">
                  <Button variant="contained" className="orange">
                    Join Project
                  </Button>

                  <Button variant="contained" className="orange">
                    Invite People
                  </Button>

                  <Button variant="contained" className="green">
                    Full Idea (Notion)
                  </Button>

                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography color="textPrimary" gutterBottom>
                    <b> WalletAddress:</b>
                    {project.wallet}
                  </Typography>
                  <br />
                  <Button variant="contained" color="primary">
                    Send A Tip
                  </Button>
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/donate"
                  >
                    Donate NFT
                  </Button>

                  <div className="page-metadata">
                    <Typography variant="body2" color="text.secondary">
                      <b> Description:</b>
                      {project.description}
                    </Typography>
                    <br />

                    <Typography variant="body2" color="text.secondary">
                      <b>Category:</b>
                      {project.category}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>

        <br />
        <br />

        {/* List of users  */}

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ height: '100px' }}>
              <Typography className="subtitle" color="textPrimary" gutterBottom>
                Why?
              </Typography>
              <p>
                We are building this project because we strongly believe on this
                mission.
              </p>
            </Box>

            <Box sx={{ height: '100px' }}>
              <Typography className="subtitle" color="textPrimary" gutterBottom>
                What?
              </Typography>
              <p>
                We are building this project because we strongly believe on this
                mission.
              </p>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ height: '100px' }}>
              <Typography className="subtitle" color="textPrimary" gutterBottom>
                How?
              </Typography>
              <p>
                We are planning this project because we strongly believe on this
                mission.
              </p>
            </Box>

            <Box sx={{ height: '100px' }}>
              <Typography className="subtitle" color="textPrimary" gutterBottom>
                Who?
              </Typography>
              <p>
                We are building this project because we strongly believe on this
                mission.
              </p>
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <br />

        <Card>
          <div className="status">
            <img src={roadmap} alt="" />
          </div>
        </Card>

        <br />
        <br />

        <Card>
          <div className="status">
            <img src={roadmap2} alt="" />
          </div>
        </Card>

        <br />
        <br />

        <Divider />
        <br />
        <br />

        <h2>User NFTs Dashboard from Covalent</h2>
        <p>
          The Covalent Unified API can be used to pull balances, positions and
          historical granular transaction data from dozens of blockchain
          networks. This data enables hundreds of end-user use-cases like
          wallets, investor dashboards, taxation tools and as-of-yet unknown
          use-cases.
        </p>

        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            {userHistory && userHistory.length ? (
              userHistory.map((project, index) => (
                <Card className="card-padding" key={index}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <img
                        className="nft-img"
                        src="https://image-proxy.svc.prod.covalenthq.com/1024,fit,png,s4PjuXzBAEmO4duzqkpuctiFUYgkSV7u_pRxQmMpfI8Y=/https://ipfs.io/ipfs/QmWN22Bco6bbbj46D8d2NGtBxynzxs4kKsWjSMLWsNz9gF"
                        alt=""
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <div className="container-flex">
                        <h2 className="inner2">{project.external_data.name}</h2>
                      </div>

                      <p className="project-description">
                        {project.external_data.description}
                      </p>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <h2>No NFTs Yet...</h2>
            )}
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default PageCommunity
