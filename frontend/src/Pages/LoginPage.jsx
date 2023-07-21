import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // dispatch actions and select state from Redux store
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // call the login API endpoint defined in usersApiSlice.js, which in turn calls the login controller in backend/controllers/userController.js
  // response is either the user object or an error object
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth); // get userInfo from Redux store

  // define the redirect param if user is logged in - get it from the URL
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get('redirect') || '/'; // get redirect query param or default to '/'

  // if user is logged in, then redirect
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]); // navigate, redirect, and userInfo are dependencies

  const submitHandler = async (e) => {
    e.preventDefault(); // prevent page from refreshing

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res })); // set credentials in Redux store and localStorage
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // update email state
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // update password state
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          className="mt-2"
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/redirect'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
