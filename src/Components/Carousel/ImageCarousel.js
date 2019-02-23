import React from 'react'
import { Container, Image } from 'semantic-ui-react'
import Carousel from 'nuka-carousel'

const ImageCarousel = () => (
	<Container textAlign='center'>
		<Carousel
		autoplay
		renderCenterRightControls={null}
		renderCenterLeftControls={null}>
	        <Image src='https://picsum.photos/750/220/?random' rounded />
	        <Image src='https://picsum.photos/750/220/?random' rounded />
	        <Image src='https://picsum.photos/750/220/?random' rounded />
	        <Image src='https://picsum.photos/750/220/?random' rounded />
	        <Image src='https://picsum.photos/750/220/?random' rounded />
	        <Image src='https://picsum.photos/750/220/?random' rounded />
      	</Carousel>
    </Container>
)

export default ImageCarousel