import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import mario from './mario.jpg'
import pacman from './pacman.png'
import pokemon from './pokemon.jpg'

function ControlledCarousel() {
  
    return (
      <Carousel>
        <Carousel.Item>
            <img
            className="col-lg-10"
            src={pacman}
            alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="col-lg-9"
            src={mario}
            alt="Second slide"
            />         
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="col-lg-12"
            src={pokemon}
            alt="Third slide"
            />

            {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption> */}
        </Carousel.Item>
        </Carousel>
    );
  }
  
  export default ControlledCarousel 