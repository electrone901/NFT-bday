import React, { useState } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './DonateNFT.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-ui/core'
import { apiKeyport } from '../../components/APIKEYPORT'
import { toast } from 'react-toast'
import { ToastContainer } from 'react-toast'

function DonateNFT() {
  const [image, setImage] = useState('')
  const [imageName, setImageName] = useState('')
  const [description, setDescription] = useState('')
  let [mintAddress, setMintAddress] = useState('')
  const [codeHash, setCodeHash] = useState('')

  const showError = () => toast.error('Oops! Some error occurred. Try again! ')
  const showSuccess = () => toast('Yay your NFT was sent successfully!')

  const mintWithNFTPort = (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
    if (mintAddress === '') {
      mintAddress = '0x5Df598c222C4A7e8e4AB9f347dcBd924B6458382'
    }
    console.log(' image', event.target.files[0])
    const form = new FormData()
    form.append('file', event.target.files[0])

    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: apiKeyport,
      },
    }

    fetch(
      'https://api.nftport.xyz/easy_mint?' +
        new URLSearchParams({
          chain: 'polygon',
          name: imageName,
          description: description,
          mint_to_address: mintAddress,
          msg:
            'This is a gift for being a great student, keep working hard on your dreams!',
        }),
      options,
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (responseJson) {
        if (responseJson) {
          showSuccess()

          setCodeHash(responseJson)
        } else {
          showError()
        }
        console.log(responseJson)
      })
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          {codeHash ? (
            <Card className="code-hash">
              <Typography gutterBottom className="title">
                Your NFT was minted succesfully 🎉
              </Typography>

              <Typography gutterBottom variant="subtitle1">
                Confirmation Transaction:
              </Typography>
              <p> {codeHash.transaction_hash}</p>

              <br />
              <p>MintedAddress:</p>
              <p>{codeHash.mint_to_address}</p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={codeHash.transaction_external_url}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="transaction-btn"
                >
                  See transaction details
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}

          <br />
          <br />
          <br />

          <Typography className="title" color="textPrimary" gutterBottom>
            💫 Gift a Birthday Card NFT ✨
          </Typography>

          {/* Add Form */}
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
            <ToastContainer delay={3000} />
            <form className="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="NFTs name"
                variant="outlined"
                className="text-field"
                defaultValue={imageName}
                onChange={(e) => setImageName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Short message"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Sent to wallet Address "
                variant="outlined"
                className="text-field"
                defaultValue={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                required
              />

              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={mintWithNFTPort}
                type="file"
              />

              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              <Button size="large" variant="contained" color="primary">
                Upload & Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default DonateNFT
