import React from 'react'
import { Link } from 'react-router-dom'
import {
  StylesProvider,
  Chip,
  Container,
  Grid,
  Button,
} from '@material-ui/core'
import './Home.css'
import ProjectList from './ProjectList'
import LoadingPage from './loadin-page/LoadingPage'
import CustomizedInputBase from '../home/pet-details/search/Search'

function Home() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <StylesProvider injectFirst>
      <Container>
        <LoadingPage />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="label-btns">
              <Chip
                size="medium"
                label="Today"
                color="primary"
                clickable
                onClick={handleDelete}
              />

              <Chip
                size="medium"
                label="Last Week"
                clickable
                onClick={handleDelete}
              />

              <Chip
                size="medium"
                label="Last Month"
                clickable
                onClick={handleDelete}
              />

              <Chip
                size="medium"
                label="All Time"
                clickable
                onClick={handleDelete}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="create"
              className="view-btn"
            >
              View
            </Button>
            <CustomizedInputBase />
          </Grid>
        </Grid>

        <ProjectList />
      </Container>
    </StylesProvider>
  )
}

export default Home
