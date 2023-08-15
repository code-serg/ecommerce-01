import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  // Helper function to render the orders section
  const renderUsers = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <Message variant="danger">{error}</Message>;
    }

    const deleteUserHandler = (id) => {
      if (window.confirm('Deleting a user... Are you sure?')) {
        console.log('deleting user');
      }
    };

    return (
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>.</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`admin/user/${user._id}/edit`}>
                  <Button variant="link" className="btn-sm">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteUserHandler(user._id)}
                >
                  <FaTrash style={{ color: 'white' }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <h3>Users</h3>
      {renderUsers()}
    </>
  );
};

export default UserListPage;
