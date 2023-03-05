import React from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import bannerOne from '../assets/bannerthree.jpg'
import bannerTwo from '../assets/bannertwo.png'
import bannerThree from '../assets/animalone.jpg'


const Banner = () => {
  return (
    <>
   <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>image one</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerTwo}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>image two</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bannerThree}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
           image three
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default Banner