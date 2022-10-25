import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../reducers/cartReducer'


const PaymentScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')

    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check 
                type='radio' 
                label='PayPal or Credit Card' 
                id='PayPal'
                name='paymentMethod' 
                value='PayPal' 
                checked 
                onChange={(e)=>setPaymentMethod(e.target.value)}>
                </Form.Check>

                <Form.Check 
                type='radio' 
                label='Ozow' 
                id='Ozow'
                name='paymentMethod' 
                value='Ozow' 
                onChange={(e)=>setPaymentMethod(e.target.value)}>
                </Form.Check>
            </Col>
        </Form.Group>
        

        <Button className='my-3' type='submit' variant='dark'>Continue</Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
