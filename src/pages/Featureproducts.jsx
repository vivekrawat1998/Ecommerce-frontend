import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../redux/thunks/Productthunks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ImageWithFallback from '../ui/Imagewithfallback';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../ui/ProductCard';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const Featureproducts = () => {
    const dispatch = useDispatch();
    const { featuredproducts, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchFeaturedProducts());
    }, [dispatch]);

    return (
        <div className="bg-gray-50 relative py-10 px-4 md:px-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🌟 Featured Products</h2>

            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={5}
                    navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
                    speed={1000}
                    className="w-full h-full"
                    loop
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {featuredproducts?.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} key={product.id} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            )}
            <div className="absolute left-1/2 -bottom-10  flex  gap-5 transform -translate-x-1/2 -translate-y-1/2 px-4 z-50">
                <button className="prev-btn bg-black hover:bg-gray-300  p-2 w-14 h-14 grid place-items-center rounded-md shadow-md">
                    <FaArrowLeft className="md:text-2xl text-gray-700" />
                </button>
                <button className="next-btn bg-black hover:bg-gray-300 p-2 w-14 h-14 grid place-items-center  rounded-md shadow-md">
                    <FaArrowRight className="md:text-2xl text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default Featureproducts;
