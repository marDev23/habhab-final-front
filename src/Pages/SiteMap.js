// {
//       lat: 7.6011085,
//       lng: 122.4266221,
//       zoom: 17
//     }
import React, { Fragment, Component } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import Footer from '../Components/footer'
import LogoCircle from '../main_logo_mobile.png'
import IconHabhab from '../my_icon1.png'

const Wrapper = styled.div`
	width: 90em;
	height: 40em;
`
const position = [7.6011085, 122.4266221]

class SiteMap extends Component {
	componentDidMount() {
  	this.map = L.map('map', {
  		center: [7.6011085, 122.4266221],
  		zoom: 17,
  		zoomControl: false
  	})
  	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  		detectRetina: true,
  		maxZoom: 25,
  		maxNativeZoom: 20
  	}).addTo(this.map)
  	const HabhabIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [35, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: IconHabhab,
    shadowSize: [35, 35],
    shadowAnchor: [22, 94]
})
  	L.marker(position, {
  		icon: HabhabIcon
  	}).addTo(this.map)
  	.bindPopup('Hab-Hab Fastfood Restaurant.')
  }
	render() {
		return (
			<Fragment>
				<Divider hidden />
				<Container>
					<Header as='h2' color='orange' textAlign='center'>
				        <Image as={Link} to='/' size='small' src={LogoCircle} /> Site Map
				    </Header>
				    <Header textAlign='center'>Libertad Tungawan Zamboanga Sibugay - serve as the main branch of the Establishment</Header>
				</Container>
				<Divider hidden />
				<Container>
					<Wrapper height='1280' height='720' id='map' />
				</Container>
				<br />
				<Footer />
			</Fragment>
		)
	}
}

export default SiteMap
