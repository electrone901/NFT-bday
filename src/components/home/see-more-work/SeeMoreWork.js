import React from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
} from '@material-ui/core'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import StarBorderIcon from '@material-ui/icons/StarBorder'

const imgData = [
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/1.jpeg',
    title: 'Buba',
    author: 'David Guetta',
    featured: true,
  },
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/2.jpg',
    title: 'Mr Vens',
    author: 'David Guetta',
    featured: false,
  },
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/3.jpg',
    title: 'Fionna',
    author: 'David Guetta',
    featured: false,
  },
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/4.jpeg',
    title: 'goodie',
    author: 'David Guetta',
    featured: true,
  },
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/7.jpg',
    title: 'Dorgey',
    author: 'David Guetta',
    featured: false,
  },

  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/6.jpeg',
    title: 'Little lion',
    author: 'David Guetta',
    featured: false,
  },
  {
    img:
      'https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/8.jpg',
    title: 'Peggy',
    author: 'David Guetta',
    featured: true,
  },
]

function SeeMoreWork({ petName, unlock, setUnlock, checkout }) {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = (image) => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div
      style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '3rem' }}
    >
      {unlock ? (
        <div>
          <p>
            Congratulations🎉🎉...!! Now you have acces exclusive content for 30
            days. Thank you for your support.
          </p>
          <p style={{ fontWeight: 700 }}>{petName}~</p>

          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
              }}
              // contentLabel="Example Modal"
            >
              <button onClick={closeModal}>close</button>
              <img
                src="https://raw.githubusercontent.com/electrone901/petgram/main/src/images/see-more-work/1.jpeg"
                alt="Buba"
                style={{
                  width: '100%',
                }}
              />
            </Modal>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              backgroundColor: '#000000db',
              marginTop: '5rem',
            }}
          >
            <ImageList
              rowHeight={200}
              gap={1}
              style={{ width: 550, transform: 'translateZ(0)' }}
            >
              {imgData.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.featured ? 2 : 1}
                  rows={item.featured ? 2 : 1}
                  onClick={openModal}
                >
                  <img src={item.img} alt={item.title} />
                  <ImageListItemBar
                    title={item.title}
                    position="top"
                    actionIcon={
                      <IconButton
                        aria-label={`star ${item.title}`}
                        style={{ color: 'white' }}
                      >
                        <StarBorderIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
      ) : (
        <Button
          variant="contained"
          style={{ backgroundColor: '#c329c8', fontWeight: 900 }}
          color="primary"
          onClick={checkout}
        >
          Unlock to see more work 🔒
        </Button>
      )}
    </div>
  )
}

export default SeeMoreWork
