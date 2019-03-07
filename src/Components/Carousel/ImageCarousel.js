import React from 'react'
import { Container, Image } from 'semantic-ui-react'
import Carousel from 'nuka-carousel'
import Slide1 from './img/1.jpg'
import Slide2 from './img/2.jpg'
import Slide3 from './img/3.jpg'
import Slide4 from './img/4.jpg'
import Slide5 from './img/5.jpg'
import Slide6 from './img/6.jpg'

const ImageCarousel = () => (
	<Container textAlign='center'>
		<Carousel
		autoplay
		renderCenterRightControls={null}
		renderCenterLeftControls={null}>
	        <Image src={Slide1} rounded />
	        <Image src={Slide2} rounded />
	        <Image src={Slide3} rounded />
	        <Image src={Slide4} rounded />
	        <Image src={Slide5} rounded />
	        <Image src={Slide6} rounded />
      	</Carousel>
    </Container>
)

export default ImageCarousel