import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'GuuVee',
  description: 'Awesome e-commerce site!',
  keywords: 'in the works...',
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default Meta;
