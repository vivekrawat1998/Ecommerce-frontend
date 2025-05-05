import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const hotDeals = [
    {
        id: 1,
        title: "Wireless Headphones",
        image: "https://img.freepik.com/free-vector/electronics-store-sale-banner-template_23-2151173125.jpg?semt=ais_hybrid&w=740",
        price: "₹1,499",
        oldPrice: "₹2,999",
        discount: "50% OFF"
    },
    {
        id: 2,
        title: "Smartwatch Pro",
        image: "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_106176-1640.jpg?semt=ais_hybrid&w=740",
        price: "₹2,999",
        oldPrice: "₹5,999",
        discount: "50% OFF"
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        image: "https://img.freepik.com/premium-vector/bluetooth-speaker-banner-ad_317396-3116.jpg",
        price: "₹999",
        oldPrice: "₹1,999",
        discount: "50% OFF"
    },
    {
        id: 4,
        title: "Fitness Tracker",
        image: "https://www.shutterstock.com/image-vector/smart-watches-fitness-tracker-health-260nw-1464187568.jpg",
        price: "₹1,299",
        oldPrice: "₹2,599",
        discount: "50% OFF"
    }
];

const HotDealsBanner = () => {
    return (
        <div className=" mx-auto px-4 sm:px-6 rounded-md overflow-hidden lg:px-8 py-8">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3500 }}
                loop={true}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[300px] md:h-[450px] lg:h-[550px]"
            >
                {hotDeals.map((deal) => (
                    <SwiperSlide key={deal.id}>
                        <div
                            className="w-full h-full bg-cover rounded-xl overflow-hidden bg-center relative"
                            style={{
                                backgroundImage: `url(${deal.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-0" />

                            <div className="relative z-10 h-full flex items-center justify-start px-8">
                                <div className="backdrop-blur-md bg-white/40 p-6 rounded-xl max-w-md text-white shadow-lg">
                                    <h2 className="text-3xl md:text-5xl  text-white font-bold mb-4">{deal.title}</h2>
                                    <div className="text-lg md:text-xl mb-2">
                                        <span className="text-yellow-400 font-bold">{deal.price}</span>
                                        <span className="line-through text-gray-300 ml-3">{deal.oldPrice}</span>
                                    </div>
                                    <p className="text-sm text-green-300 font-semibold mb-6 uppercase tracking-wider">
                                        {deal.discount}
                                    </p>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition-all">
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HotDealsBanner;
