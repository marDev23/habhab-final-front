import React, { Component, Fragment } from 'react'
import { Segment, Grid, Menu, Header, Button, Modal, Form, Dropdown, Loader, Message } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import dayjs from 'dayjs'
import { DateInput } from 'semantic-ui-calendar-react'
import { withRouter } from 'react-router-dom'
import { ME_PRIMARY, ME_MORE, UPDATE_BASICINFO, ALL_ADDRESS, UPDATE_MOREINFO, CHANGE_PASS } from '../QUERIES/ALL_QUERIES'
import { AccountMenu } from '../Components/Account'

const genderOptions = [ { key: 'male', value: 'male', text: 'Male' }, { key: 'female', value: 'female', text: 'Female' } ]

class ProfileFromAccount extends Component {
	state = {
		openModalBasic: false,
		openModalMore: false,
		openModalPass: false,
		name: '',
		email: '',
		mobile: '',
		birthday: '',
		gender: '',
		address: '',
		addressId: '',
		newPassword: '',
		oldPassword: ''
	}

  showBasicInfo = () => this.setState({ openModalBasic: true })
  showMoreInfo = () => this.setState({ openModalMore: true })
  showPassInfo = () => this.setState({ openModalPass: true })
  closeBasicInfo = () => this.setState({ openModalBasic: false })
  closeMoreInfo = () => this.setState({ openModalMore: false })
  closePassInfo = () => this.setState({ openModalPass: false })
  changeNameInfo = ({target: { value } }) => this.setState({ name: value })
  changeEmailInfo = ({target: { value } }) => this.setState({ email: value })
  changeMobileInfo = ({target: { value } }) => this.setState({ mobile: value })
  changeDateInfo = (e, { name, value }) => {
  	// console.log(value)
  this.setState({ birthday: value })
}
  changeGenderInfo = (e, { name, value }) => {
  	console.log(value)
   this.setState({ gender: value })
  }
   changeAddressInfo = (e, { value, options}) => {
  	const selectedAddress = options.find(x => x.key === value)
   this.setState({ address: selectedAddress.key, addressId: selectedAddress.key })
  }

  changeOldPass = ({target: { value } }) => this.setState({ oldPassword: value })
  changeNewPass = ({target: { value } }) => this.setState({ newPassword: value })

	render() {
		const { match, history } = this.props
		const { 
			openModalBasic, 
			openModalMore,
			openModalPass,
			name, 
			email, 
			mobile, 
			birthday: newBirthday, 
			gender: newGender, 
			address, 
			addressId,
			oldPassword,
			newPassword,
		} = this.state
		console.log(newBirthday, newGender, addressId)
		console.log(newGender)
		return (
			<Segment style={{ padding: '3em 0em', minHeight: '100%' }} vertical>
				<Grid container stackable centered columns={2}>
				<Grid.Row>
				    <Grid.Column width={4}>
						<AccountMenu activeItem={`${match.url}`} />
					</Grid.Column>
					<Grid.Column width={8}>
						<Menu vertical fluid>
					        <Menu.Item>
					          <Header color='orange' as='h4'>Basic Info</Header>
					          <Query query={ME_PRIMARY}>
					          {({ loading, data: { me } }) => {
					          	if (loading) return ''
					          	console.log(me)
					          	return (
					          		<Fragment>
					          		<p>NAME:&nbsp;&nbsp;{me.name.toUpperCase()}</p>
					          		<p>MOBILE:&nbsp;&nbsp;{me.mobile}</p>
					          		<p>E-MAIL:&nbsp;&nbsp;{me.email}</p>
					          		<Button
							      	fluid
							      	size='tiny'
							      	color='orange'
							      	onClick={this.showBasicInfo}
							      >Update</Button>
							      	<Modal size='tiny' open={openModalBasic} onClose={this.closeBasicInfo} closeIcon>
							          <Modal.Header>Update Basic Info</Modal.Header>
							          <Modal.Content>
							          <Mutation mutation={UPDATE_BASICINFO}>
							          {( updateBasicInfo, { loading, error, data }) => (
							          	<Fragment>
							          	{ loading && <Loader active inline='centered' />}
							          	{error && 
							          	<Message
							          		negative
							          		size='small'
							          	>
										    <Message.Header>Error!</Message.Header>
										    <p>Error Updating Basic Info</p>
										</Message>}
							          	{ data && history.go(0) }
							            <Form onSubmit={evt => {
							            	const { target } = evt
							            	evt.preventDefault();
							            	const nameForm = target[0].value
							            	const emailForm = target[1].value
							            	const mobileForm = target[2].value
							            	updateBasicInfo({
							            		variables: {
							            			name: nameForm,
							            			email: emailForm,
							            			mobile: mobileForm
							            		}
							            	})
							            }}
							            >
										    <Form.Field>
										      <label>Name</label>
										      <input
										      	placeholder='Full Name'
										      	name='name'
										      	value={name === null || name === '' ? me.name : name}
										      	onChange={this.changeNameInfo} />
										    </Form.Field>
										    <Form.Field>
										      <label>Mobile</label>
										      <input 
										      	placeholder='Mobile'
										      	name='mobile'
										      	value={mobile === null || mobile === '' ? me.mobile : mobile} 
										      	onChange={this.changeMobileInfo}/>
										    </Form.Field>
										    <Form.Field>
										      <label>E-MAIL</label>
										      <input 
										      	placeholder='E-mail' 
										      	name='email'
										      	value={email === null || email === '' ? me.email : email}
										      	onChange={this.changeEmailInfo}/>
										    </Form.Field>
										    <Button color='orange' size='small' fluid type='submit'>Submit</Button>
										  </Form>
										  </Fragment>
										 )}
										</Mutation>
							          </Modal.Content>
							        </Modal>
					          		</Fragment>
					          	)
					          }}
					          </Query>
					        </Menu.Item>

					        <Menu.Item>
					          <Header color='orange' as='h4'>More Info</Header>
					          <Query query={ME_MORE}>
					          {({ loading, data: { meMore } }) => {
					          if (loading) return ''
					          	// console.log(data)
					          return (
					          	<Fragment>
					          	{
					          		meMore.gender === null || meMore.gender === undefined
					          		?
					          		<p>GENDER:&nbsp;&nbsp;</p>
					          		:
					          		<p>GENDER:&nbsp;&nbsp;{meMore.gender.toUpperCase()}</p>
					          	}
					          	{
					          		meMore.gender === null || meMore.gender === undefined
					          		?
					          		<p>BIRTHDAY:&nbsp;&nbsp;</p>
					          		:
					          		<p>BIRTHDATE:&nbsp;&nbsp;{dayjs(meMore.birthday).format('MM-DD-YYYY')}</p>
					          	}

					          	{
						          	meMore.address === null || meMore.address === undefined
						          	?
						          	<p>ADDRESS:&nbsp;&nbsp;</p>
						          	:
						          	<p>
						          	ADDRESS:&nbsp;&nbsp;
						          	{meMore.address.province.toUpperCase()},&nbsp;&nbsp;
						          	{meMore.address.municipal.toUpperCase()},&nbsp;&nbsp;
						          	{meMore.address.baranggay.toUpperCase()}&nbsp;&nbsp;
						          	Philippines &nbsp;&nbsp;{meMore.address.zip}
						          	</p>
					          	}
					          	<Button
							      	fluid
							      	size='tiny'
							      	color='orange'
							      	onClick={this.showMoreInfo}
							    >Update New</Button>
							    <Modal size='tiny' open={openModalMore} onClose={this.closeMoreInfo} closeIcon>
							          <Modal.Header>Update New Info</Modal.Header>
							          <Modal.Content>
							          <Mutation mutation={UPDATE_MOREINFO}>
							          {( addMoreInfo, { loading, data, error }) => (
							          	<Fragment>
							          	{ data && history.go(0) }
							          	{error && 
							          	<Message
							          		negative
							          		size='small'
							          	>
										    <Message.Header>Error!</Message.Header>
										    <p>Error Updaing New Info!</p>
										</Message>}
							            <Form onSubmit={evt => {
							            	evt.preventDefault();
							            	addMoreInfo({
							            		variables: {
							            			gender: newGender,
							            			birthday: newBirthday,
							            			address: addressId
							            		}
							            	})
							            }}>
										    <Form.Field>
										      <label>Gender</label>
										      	<Dropdown 
										      		placeholder='Gender' 
										      		search
										      		name='gender'
										      		value={newGender === '' || meMore.gender === undefined ? 'Male' : newGender}
										      		selection 
										      		options={genderOptions}
										      		onChange={this.changeGenderInfo} 
										      		/>
										    </Form.Field>
										    <Form.Field>
										      <label>Birthdate</label>
										      <DateInput
										          name="date"
										          dateFormat="MM-DD-YYYY"
										          placeholder="Date"
										          value={newBirthday}
										          iconPosition="left"
										          onChange={this.changeDateInfo}
										        />
										    </Form.Field>
										    <Form.Field>
										      <label>Address</label>
										      <Query query={ALL_ADDRESS}>
										      {({ loading, data }) => {
										      	if (loading) return ''
										      	console.log(data)
										      	const addressOptions= data.addresses.map(x => ({
										      		key: x.id, value: x.id, text: x.municipal.toUpperCase()+'/'+x.baranggay.toUpperCase()
										      	}))
										      	console.log(addressOptions)
										      	return (
										      <Dropdown 
										      		placeholder='Address' 
										      		search
										      		name={address}
										      		value={addressId}
										      		selection 
										      		options={addressOptions}
										      		onChange={this.changeAddressInfo} 
										      		/>
										      	)
										      	}}
										      	</Query>
										    </Form.Field>
										    <Button color='orange' size='small' fluid type='submit'>Submit</Button>
										  </Form>
										  </Fragment>
										  )}
										</Mutation>
							          </Modal.Content>
							        </Modal>
					          </Fragment>
					          )
					      	  }}
					          </Query>
					        </Menu.Item>
					        <Menu.Item>
					          <Header color='orange' as='h4'>Password</Header>
					          		<p>Password:&nbsp;&nbsp;********</p>
					          		<Button
							      	fluid
							      	size='tiny'
							      	color='orange'
							      	onClick={this.showPassInfo}
							      >Update</Button>
							      	<Modal size='tiny' open={openModalPass} onClose={this.closePassInfo} closeIcon>
							          <Modal.Header>Change Password</Modal.Header>
							          <Modal.Content>
							          <Mutation mutation={CHANGE_PASS}>
							          {( changePassword,  { loading, data, error }) => (
							          	<Fragment>
							          	{loading && <Loader active inline='centered' />}
							          	{ error && 
						                    <Message
						                    size='mini'
						                    error
						                    header='Error Changing Password!'
						                    list={error.graphQLErrors.map(x => x.message)}
						                  /> }
										{ data && history.go(0) }
								            <Form onSubmit={evt => {
								            	evt.preventDefault();
								            	changePassword({
								            		variables: {
								            			oldPassword,
								            			newPassword
								            		}
								            	})
								            }}>
											    <Form.Field>
											      <label>Old Password</label>
											      <input
											      	placeholder='Old Password'
											      	name='oldPassword'
											      	type='password'
											      	value={oldPassword}
											      	onChange={this.changeOldPass} />
											    </Form.Field>
											    <Form.Field>
											      <label>New Password</label>
											      <input 
											      	placeholder='New Password' 
											      	name='newPassword'
											      	type='password'
											      	value={newPassword}
											      	onChange={this.changeNewPass}/>
											    </Form.Field>
											    <Button color='orange' size='small' fluid type='submit'>Submit</Button>
											  </Form>
										  </Fragment>
										)}
										</Mutation>
							          </Modal.Content>
							        </Modal>
					        </Menu.Item>
		      			</Menu>
				    </Grid.Column>
				</Grid.Row>
				</Grid>
			</Segment>
		)
	}
}

export default withRouter(ProfileFromAccount)
