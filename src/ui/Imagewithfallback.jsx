// components/ImageWithFallback.js
import React from 'react';
import { getImageUrl } from '../utils/Getimagurl';

const ImageWithFallback = ({ images, alt, className, ...props }) => {
    const src = getImageUrl(images);

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => {
                e.target.src = 'https://cdn.prod.website-files.com/64022de562115a8189fe542a/6616718fe4a871d7278a2037_Product-Concept-What-Is-It-And-How-Can-You-Best-Use-It.jpg';
            }}
            {...props}
        />
    );
};

export default ImageWithFallback;
