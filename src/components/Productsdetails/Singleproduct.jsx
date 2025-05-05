import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProducts } from '../../redux/thunks/Productthunks';
import ProductCard from '../../ui/ProductCard';

const Singleproduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProducts(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-4">No product found.</div>;

    return (
        <div className="max-w-xl mx-auto mt-32 px-4">
            <ProductCard key={product.id} product={product} />
        </div>
    );
};

export default Singleproduct;
