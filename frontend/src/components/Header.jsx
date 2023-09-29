import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import Message from './Message';
// import logo from '../assets/logo-cs.png';
import logo from '../assets/logo-mc.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart); // 'cart' - cartSliceReducer key in store.js
  const { userInfo } = useSelector((state) => state.auth); // 'auth' - authSliceReducer key in store.js

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout()); // remove credentials from Redux store and localStorage
      dispatch(resetCart()); // remove cart items from Redux store and localStorage
      navigate('/'); // redirect to home page
    } catch (error) {
      toast.error(
        <Message variant='danger'>
          Something went wrong. App did not logout user
        </Message>
      );
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='logo' width='50px' height='50px' />
              <span className='ms-2'>MERN Commerce</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' className='ms-1'>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
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
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
