import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/thunks/Productthunks';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, loading, error } = useSelector((state) => state.products);
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = (dir) => {
        setIsScrolling(true);
        scrollRef.current?.scrollBy({
            left: dir === 'left' ? -300 : 300,
            behavior: 'smooth',
        });
        setTimeout(() => setIsScrolling(false), 300);
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (index, slug) => {
        setActiveIndex(index);
        navigate(`/products/category/${slug}`, { state: { fromCategories: true } });
    };

    if (loading) return (
        <div className="p-4 text-center">
            <div className="animate-pulse flex space-x-4">
                <div className="bg-gray-200 h-10 w-32 rounded-md"></div>
                <div className="flex-1 space-x-4 flex">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-gray-200 h-10 w-24 rounded-md"></div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="relative flex gap-2 mx-auto py-6 px-4">
            <div className="absolute bg-white right-0 top-1/2 -translate-y-1/2 z-10 flex space-x-2">
                <button 
                    onClick={() => scroll('left')} 
                    disabled={isScrolling}
                    className="p-2 text-white cursor-pointer bg-gray-900 rounded-md shadow hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                    <FiChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => scroll('right')} 
                    disabled={isScrolling}
                    className="p-2 bg-gray-900 text-white cursor-pointer rounded-md shadow hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                    <FiChevronRight className="w-5 h-5" />
                </button>
            </div>
            
            <Link 
                to="/products" 
                className="bg-black p-2 whitespace-nowrap text-white w-32 rounded-md grid place-items-center hover:bg-gray-800 transition-colors"
                onClick={() => setActiveIndex(null)}
            >
                All Categories
            </Link>
            
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pb-2 scroll-smooth"
                style={{ scrollbarWidth: 'none' }}
            >
                <AnimatePresence>
                    {categories.map((category, index) => (
                        <motion.div
                            key={category._id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                to={`/products/category/${category.slug}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryClick(index, category.slug);
                                }}
                                className={`${
                                    activeIndex === index 
                                        ? "bg-black text-white" 
                                        : "bg-white text-black hover:bg-gray-100"
                                } border border-gray-200 grid place-items-center whitespace-nowrap p-3 rounded-md flex-shrink-0 transition-colors duration-200`}
                            >
                                {category.name}
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Categories;
