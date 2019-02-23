import React, { Component } from 'react'
// import { Query } from 'react-apollo'
// import { MY_ADDRESS } from '../../QUERIES/ALL_QUERIES'
import { Review, Delivery, Confirmation, Success, Steps } from './'
 
class MainCheckout extends Component {
    constructor (props) {
        super();
        console.log(props)
        this.state = {
          step: 1,
          municipal: props.address.municipal,
          baranggay: props.address.baranggay,
          addressId: props.address.id,
          isPickUpAvailable: false,
          deliveryOption: '',
          dateTime: '',
        }
    }
    handleClickDelivery = (event, data) => {
        if (data.checked) {
            this.setState({ deliveryOption: data.id })
        }
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({ step : step + 1 })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({ step : step - 1 })
    }

    handleChangeMunicipal = (e, {value, options }) => {
        this.setState({ municipal: value })
    }
    handleChangeBaranggay = (e, { value, options }) => {
        console.log(options)
        const filterFinal = options.find(x => x.value === value)
        this.setState({ baranggay: value, addressId: filterFinal.key, isPickUpAvailable: filterFinal.ispickupavailable })
    }

    handleChangeDateTime = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

	render(){

        const { step, municipal, baranggay, addressId, isPickUpAvailable, dateTime, deliveryOption} = this.state
        const delivery = { municipal, baranggay, addressId, isPickUpAvailable, dateTime, deliveryOption}
        switch(step) {
        default:
            return (
                    <Steps step={step}>
                        <Review 
                            nextStep={this.nextStep} 
                        />
                    </Steps>
    
            )
        case 1:
            return (
 					<Steps step={step}>
						<Review
		                    nextStep={this.nextStep}
		                />
		            </Steps>
	
            )
        case 2:
            return (
                    
                    <Steps step={step}>
                        <Delivery 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            delivery={delivery}
                            handleChangeBaranggay={this.handleChangeBaranggay}
                            handleChangeMunicipal={this.handleChangeMunicipal}
                            handleChangeDateTime={this.handleChangeDateTime}
                            handleClickDelivery={this.handleClickDelivery}
                        />
                    </Steps>
            )
        case 3:
            return (
            		<Steps step={step}>
						<Confirmation 
		                    nextStep={this.nextStep}
		                    prevStep={this.prevStep}
                            delivery={delivery}
		                />
		            </Steps>

            )
        case 4:
            return (
            		<Steps step={step}>
						<Success />
					</Steps>

            )
        }
    }

}

export default MainCheckout
