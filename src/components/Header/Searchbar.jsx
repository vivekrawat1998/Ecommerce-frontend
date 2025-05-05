import React, { useState, useRef, useMemo, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsBySearch } from '../../redux/thunks/Productthunks';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dispatch = useDispatch();
    const debounceTimeout = useRef(null);
    const navigate = useNavigate();

    const { products, loading, error } = useSelector(state => state.products);
    const filteredProducts = useMemo(() => (products || []).slice(0, 8), [products]);

    // Debug logs
    useEffect(() => {
        console.log('Products:', products);
    }, [products]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setActiveIndex(-1);

        clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (value.trim()) {
                dispatch(fetchProductsBySearch(value));
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }, 300);
    };

    const handleSuggestionClick = (product) => {
        setQuery('');
        setShowSuggestions(false);
        navigate(`/products/item/${product.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => Math.min(prev + 1, filteredProducts.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(filteredProducts[activeIndex]);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => {
                    setShowSuggestions(false);
                    setIsFocused(false);
                }, 200)}
                onKeyDown={handleKeyDown}
                className="w-full px-10 py-2.5 rounded-full bg-indigo-100 text-gray-700 placeholder-gray-400 outline-none focus:bg-white"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

            {isFocused && showSuggestions && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                    {loading ? (
                        <div className="p-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    ) : error ? (
                        <div className="p-2 text-red-500">Error: {error}</div>
                    ) : filteredProducts.length > 0 ? (
                        <ul role="listbox">
                            {filteredProducts.map((product, index) => {
                                const productImage = Array.isArray(product.images) && product.images.length > 0 
                                    ? product.images[0].url 
                                    : (typeof product.images === 'string' ? product.images : '/placeholder-image.jpg');

                                return (
                                    <li
                                        key={product.id}
                                        onClick={() => handleSuggestionClick(product)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        role="option"
                                        aria-selected={index === activeIndex}
                                        className={`flex items-center p-2 hover:bg-indigo-100 ${
                                            index === activeIndex ? 'bg-indigo-100' : ''
                                        }`}
                                    >
                                        <img
                                            src={productImage}
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded mr-3"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">{product.name}</div>
                                            <div className="text-sm text-gray-500 truncate">
                                                {product.description}
                                            </div>
                                            <div className="text-sm font-semibold text-blue-600">
                                                ${product.price?.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="ml-2 text-xs text-yellow-500 bg-white px-2 py-1 rounded-full">
                                            ★ {product.rating?.toFixed(1) || '0.0'}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="p-2 text-gray-500">
                            {query ? `No results for "${query}"` : "Start typing to search"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;
