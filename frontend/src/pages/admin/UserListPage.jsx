import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    if (window.confirm('Deleting a user... Are you sure?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  // Helper function to render the orders section
  const renderUsers = () => {
    if (isLoading || isLoadingDelete) {
      return <Loader />;
    }

    if (error) {
      return (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      );
    }

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
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
