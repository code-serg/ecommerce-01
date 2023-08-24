import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

const propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  variant: 'info',
};

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
