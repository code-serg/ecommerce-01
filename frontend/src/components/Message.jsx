import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.propTypes = PropTypes.func.isRequired;

export default Message;
