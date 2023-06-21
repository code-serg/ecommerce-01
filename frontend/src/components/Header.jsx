import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';  
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/loginSlice';
import logo from '../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); // 'cart' - cartSliceReducer key in store.js 
  const { userInfo } = useSelector((state) => state.login); // 'login' - loginSliceReducer key in store.js 

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout()); // remove credentials from Redux store and localStorage
      navigate('/'); // redirect to home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt="logo" width="50px" height="50px" />
              GuuVee
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                    { cartItems.length > 0 && (
                      <Badge pill bg='success' className='ms-1'>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                      )
                    }
                  </Nav.Link>
              </LinkContainer>
              { userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link href='/login'>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header