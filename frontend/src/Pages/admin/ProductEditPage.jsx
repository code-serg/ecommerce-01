import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    try {
      await updateProduct(updatedProduct);
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  // helper function to display form
  const renderForm = () => {
    if (isLoading || isLoadingUpload) {
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
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price" className="my-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="image" className="my-2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Form.Control
            type="file"
            label="Choose File"
            onChange={uploadFileHandler}
          />
        </Form.Group>

        <Form.Group controlId="description" className="my-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="brand" className="my-2">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="category" className="my-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="countInStock" className="my-2">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
      </Form>
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Product</h2>
        {isLoadingUpdate && <Loader />}
        {renderForm()}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
