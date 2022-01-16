import React from 'react'
import { Container, StylesProvider } from '@material-ui/core'
import './CommunityContainer.css'
import BasicTabs from './BasicTabs'

function CommunityContainer({ account, contractData }) {
  return (
    <StylesProvider injectFirst>
      <Container
        className="root-community"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <BasicTabs  account={account} contractData={contractData}/>
      </Container>
    </StylesProvider>
  )
}

export default CommunityContainer
