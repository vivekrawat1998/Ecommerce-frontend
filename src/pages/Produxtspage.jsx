import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, fetchAllProducts } from '../redux/thunks/Productthunks';
import ProductCard from '../ui/ProductCard';

const ProductsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  useEffect(() => {
    if (slug) {
      dispatch(fetchProductsByCategory(slug));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [slug, dispatch]);

  if (loading) return <div className="p-4 text-center">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mt-24 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {slug ? `Category: ${slug}` : 'All Products'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
