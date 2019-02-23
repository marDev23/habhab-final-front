import React from 'react'
import { Loader } from 'semantic-ui-react'

const Spinner = () => (
<Loader
active
style={{
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'}}
  	inline='centered' size='large'
 />
)

export default Spinner
