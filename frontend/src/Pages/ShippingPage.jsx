import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingPage = () => {
  // get cart from redux store - check it for existing shipping address data
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  // initialize state
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  // initialize navigate and dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch saveShippingAddress action
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // navigate to payment page
    navigate('/payment');
  }

  return (
    <FormContainer>
      <h2>Shipping</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
        

      </Form>

    </FormContainer>
  )
}

export default ShippingPage;