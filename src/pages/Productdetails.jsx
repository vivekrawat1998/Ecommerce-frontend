import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProducts } from '../redux/thunks/Productthunks';
import Productdesc from '../components/Productsdetails/Productsdesc';
import ProductCard from '../ui/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Productdetails = () => {
    const { id } = useParams();  // Get the product id from the route
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.product); // Get product data from store
    const loading = useSelector((state) => state.products.loading); // Loading state
    const error = useSelector((state) => state.products.error); // Error state

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // Fetch product when ID changes
    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProducts(id)); // Dispatch action to fetch product data
        }
    }, [dispatch, id]);

    // Handle recently viewed products in localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const filtered = stored.filter((p) => p.id !== product?._id); 
        setRecentlyViewed(filtered);
    }, [product]);

    return (
        <div className="product-details-container">
            {/* Pass fetched product data as a prop to Productdesc */}
            <Productdesc product={product} loading={loading} error={error} />

            {/* Recently viewed section with Swiper.js */}
            {recentlyViewed.length > 0 && (
                <div className="mt-16 px-20">
                    <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {recentlyViewed.map((item) => (
                            <SwiperSlide key={item.id}>
                                <ProductCard product={item} showAddToCart={true} showbadge={true} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Productdetails;
