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
import CustomizedInputBase from './pet-details/search/Search'

function Projects() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <Container>
      {/* Projects header  */}
      <Grid container spacing={1} className="padding-top">
        <Grid item xs={6}>
          {/* <h2>Browse, search or add  NFT's to your collections.</h2> */}
          <div className="label-btns">
            <Chip
              size="small"
              label="Today"
              color="primary"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="small"
              label="Last Week"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="small"
              label="Last Month"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="small"
              label="All Time"
              clickable
              onClick={handleDelete}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <CustomizedInputBase />
        </Grid>
      </Grid>

      <ProjectList />
    </Container>
  )
}

export default Projects
