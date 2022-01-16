import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home'
import Projects from './components/home/Projects'
import LoadingPage from './components/home/loadin-page/LoadingPage'
import PetDetails from './components/home/pet-details/PetDetails'
// import CreatePet from './components/create-post/CreatePet'
// import PixelMaker from './components/pixelMaker/PixelMaker'
import PageCommunity from './components/community/page-community/PageCommunity'
import RegisterCommunity from './components/community/register-community/RegisterCommunity'
import DonateNFT from './components/donate-nft/DonateNFT'

import PlantswapContainer from './components/plantswap/plantswap-container/PlantswapContainer'

import NftTemplates from './components/plantswap/nft-templates/NftTemplates'

import NFTsListByAddress from './components/NFTsListByAddress/NFTsListByAddress'

import Web3 from 'web3'
// import MyPet from './abis/Pet.json'
import community from './abis/Community.json'
import randomNumChainLink from './abis/Random.json'

function App() {
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')
  const [randomContract, setRandomContract] = useState('')

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }

  const getContract = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()

    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = community.networks[networkId]

    if (networkData) {
      const abi = community.abi
      const address = community.networks[networkId].address
      const myContract = new web3.eth.Contract(abi, address)
      setContractData(myContract)

      // randomNumChainLink
      // const abiChainlink = randomNumChainLink.abi
      // const addressChainlink = randomNumChainLink.networks[networkId].address
      // const myRandom = new web3.eth.Contract(abiChainlink, addressChainlink)
      // const res = await myRandom.randomResult().call()
      // console.log('🚀 ~ file: App.js ~ line 58 ~ getContract ~ res', res)

      // setRandomContract(myRandom)
    } else {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }

  const connectWallet = async () => {
    await loadWeb3()
    await getContract()
  }

  console.log('contractData', contractData)
  return (
    <Router>
      <div className="cl">
        <Navbar account={account} connectWallet={connectWallet} />
        <Route exact path="/" component={LoadingPage} />
        <Route exact path="/old" component={Home} />
        <Switch>
          <Route exact path="/donate" component={DonateNFT} />

          <Route exact path="/giftcard">
            <DonateNFT account={account} contractData={contractData} />
          </Route>

          <Route exact path="/create">
            <RegisterCommunity account={account} contractData={contractData} />
          </Route>

          <Route exact path="/projects">
            <Projects account={account} contractData={contractData} />
          </Route>

          <Route exact path="/collection/wallet-address">
            <NFTsListByAddress account={account} contractData={contractData} />
          </Route>

          <Route exact path="/app">
            <LoadingPage account={account} contractData={contractData} />
          </Route>

          <Route exact path="/my-collection">
            <PlantswapContainer account={account} contractData={contractData} />
          </Route>

          <Route exact path="/nft-templates">
            <NftTemplates account={account} contractData={contractData} />
          </Route>

          <Route path="/card-details/:cid">
            <PetDetails
              account={account}
              contractData={contractData}
              randomContract={randomContract}
            />
          </Route>

          <Route path="/project/:projectId">
            <PageCommunity account={account} contractData={contractData} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
