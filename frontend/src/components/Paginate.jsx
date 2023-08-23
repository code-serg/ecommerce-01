/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // helper function to generate the query string
  const queryString = (x) => {
    if (isAdmin) {
      // search for products in admin/productlist page is not supported
      return `/admin/productlist/${x + 1}`;
    }

    // if keyword is present, then return a search query string
    if (keyword) {
      return `/search/${keyword}/page/${x + 1}`;
    }

    return `/page/${x + 1}`;
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={queryString(x)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
