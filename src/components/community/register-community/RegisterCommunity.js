import React, { useState, useEffect } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './RegisterCommunity.css'
import { Link } from 'react-router-dom'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Chip,
  Grid,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../../../APIKEYS'

import ImageEditor from '@toast-ui/react-image-editor'
import 'tui-image-editor/dist/tui-image-editor.css'

// import { providers } from 'ethers'
// import { init } from '@textile/eth-storage'

const theme = {
  'common.bi.image':
    'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
  'common.bisize.width': '50px',
  'common.bisize.height': '50px',
  'common.backgroundImage': 'none',
  'common.backgroundColor': '#1e1e1e',
  'common.border': '0px',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': 'NotoSans, sans-serif',
  'loadButton.fontSize': '12px',

  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': 'NotoSans, sans-serif',
  'downloadButton.fontSize': '12px',

  // icons default
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',

  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': '#1e1e1e',
  'submenu.partition.color': '#858585',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': '#151515',
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '3px solid #1e1e1e',
  'colorpicker.title.color': '#fff',
}

function RegisterCommunity({ account, contractData }) {
  const history = useHistory()
  const petTypeRef = React.createRef()
  const [projectType, setProjectType] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [PhysicalAddress, setPhysicalAddress] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

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

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    console.log(imageName, imageType)
  }

  // const saveToTextile = async () => {
  //   try {
  //     // connects to ethereum & web3
  //     await window.ethereum.enable()
  //     const provider = new providers.Web3Provider(window.ethereum)
  //     const wallet = provider.getSigner()
  //     // const storage = await init(wallet)

  //     // creates a file to save data
  //     const communityImage = new Blob([image], { type: 'text/plain' })
  //     const file = new File([communityImage], 'community.txt', {
  //       type: 'text/plain',
  //       lastModified: new Date().getTime(),
  //     })

  //     // await storage.addDeposit()
  //     const { cid } = await storage.store(file)
  //     let formattedCid = cid['/']
  //     return formattedCid
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const saveToNFTStorage = async () => {
    console.log(
      'all info',
      description,
      image,
      projectType,
      walletAddress,
      name,
    )

    try {
      const client = new NFTStorage({ token: apiKey })
      const data = await client.store({
        name: name,
        description: `${description}, ${projectType}, ${walletAddress}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (data) {
        let imgPath = data.data.image.pathname
        imgPath = imgPath.substring(2)
        const nftStorageImgPath = `https://ipfs.io/ipfs/${imgPath}`
        return nftStorageImgPath
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveToChain = async (event) => {
    event.preventDefault()

    const imageFromnftStorage = await saveToNFTStorage()
    console.log(
      '🚀 ~ file: RegisterCommunity.js ~ line 129 ~ saveToChain ~ imageFromnftStorage',
      imageFromnftStorage,
    )

    // try {
    //   // save image to nftStorage, get the imageURL then save imgURL and data to chain using the contract
    //   // let imageFromnftStorage =
    //   //   'https://ipfs.io/ipfs/bafybeidil6m4cb6ik3wcuncu3hck5umcythl67ten4ujw7zf6wujpuwnna/bro_vector_adobestock_329020800_2.jpg'

    //   let imageFromnftStorage =
    //     'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    //   let name = 'first Project'
    //   let description = 'This is my dream Project'
    //   let PhysicalAddress = 'Adress'
    //   let walletAddress = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'

    //   const req = await contractData.methods
    //     .registerCommunity(
    //       imageFromnftStorage,
    //       name,
    //       description,
    //       PhysicalAddress,
    //       walletAddress,
    //     )
    //     .send({ from: account })
    //   console.log(
    //     '🚀 ~ file: RegisterCommunity.js ~ line 122 ~ saveToChain ~ req',
    //     req,
    //   )
    // } catch (err) {
    //   console.error(err)
    // }
  }

  return (
    <StylesProvider injectFirst>
      <Container style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
        <Grid container spacing={1} className="padding-top">
          <Grid item xs={6}>
            <Typography
              className="title"
              color="textPrimary"
              gutterBottom
              style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
            >
              Please add your wishes for Albert Lee ~
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/nft-templates"
              className="create-btn"
              color="primary"
            >
              + Create NFT Template
            </Button>
          </Grid>
        </Grid>

        <ImageEditor
          includeUI={{
            loadImage: {
              path: 'img/sampleImage.jpg',
              name: 'SampleImage',
            },
            theme,
            menu: [
              'shape',
              'filter',
              'text',
              'mask',
              'icon',
              'draw',
              'crop',
              'flip',
              'rotate',
            ],
            initMenu: 'filter',
            uiSize: {
              // width: '1000px',
              height: '800px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        />
        <Container className="root-create-pet">
          <div>
            <Typography className="title" color="textPrimary" gutterBottom>
              Save Your Awesome NFT Birthday Card!
            </Typography>

            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="pet"
                className="img-preview"
              />
            ) : (
              ''
            )}
            <div className="form-container">
              <form className="form" noValidate autoComplete="off">
                {/* Community image */}
                <input
                  accept="image/*"
                  className="input"
                  id="icon-button-photo"
                  defaultValue={image}
                  onChange={handleImage}
                  type="file"
                />
                <label htmlFor="icon-button-photo">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                {/* Community image */}

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  className="text-field"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                  className="text-field"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Digital Wallet Address"
                  variant="outlined"
                  className="text-field"
                  defaultValue={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />

                <TextField
                  fullWidth
                  name="petType"
                  select
                  label="Choose one option"
                  variant="outlined"
                  className="text-field"
                  onChange={(e) => setProjectType(e.target.value)}
                  defaultValue=""
                  ref={petTypeRef}
                >
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Social Good">Social Good</MenuItem>
                  <MenuItem value="App Development">App Development</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={saveToChain}
                >
                  Submit
                </Button>
              </form>
            </div>
            {/* <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={saveToTextile}
          >
            getList
          </Button> */}
          </div>
        </Container>
      </Container>
    </StylesProvider>
  )
}

export default RegisterCommunity
