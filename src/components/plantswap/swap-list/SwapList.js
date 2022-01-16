import React, { useState, useEffect } from 'react'
import './SwapList.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { Link } from 'react-router-dom'
import { apiKey } from '../../../APIKEYS'
import CircularStatic from '../../commons/CircularProgressWithLabel'

function SwapList({ account, contractData }) {
  const [loading, setLoading] = useState(false)
  const [swapsData, setSwapsData] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const userWallet = '0x9B6efdCFcdfb9825f805C2FE2f7f87eBBe76b253'
  // const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'

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
    const loadSwapList = async () => {
      try {
        setLoading(true)
        if (userWallet) loadMyCollection()
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        console.log(' cids', cids)
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let dataSplit = data.description.split(',')
            data.description = dataSplit[0]
            data.userAccount = dataSplit[1]

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.image = await getImage(data.image)
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setSwapsData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadSwapList()
  }, [])

  return (
    <div style={{ minHeight: '40vh' }}>
      <h2>Covalent</h2>
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
                      src={project.external_data.image}
                      // src="https://image-proxy.svc.prod.covalenthq.com/1024,fit,png,s4PjuXzBAEmO4duzqkpuctiFUYgkSV7u_pRxQmMpfI8Y=/https://ipfs.io/ipfs/QmWN22Bco6bbbj46D8d2NGtBxynzxs4kKsWjSMLWsNz9gF"
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
      <h2>END Covalent</h2>

      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          <Grid container spacing={24}>
            {swapsData.length ? (
              swapsData.map((swap, index) => (
                <Grid item md={3} spacing={1} className="swap-card">
                  <Card sx={{ maxWidth: 245 }}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={swap.image}
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="card-header-swap"
                      >
                        {swap.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        style={{ fontSize: '0.7125rem', marginLeft: '6.4rem' }}
                        // to={`/collection/${pet.cid}`}

                        // "/collection/wallet-address"
                        // className="swap-msg-btn"
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No PlantSwaps Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default SwapList
