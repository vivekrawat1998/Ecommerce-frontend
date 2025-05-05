export const getImageUrl = (images) => {
    if (!images) return '/placeholder-image.jpg';
    
    if (Array.isArray(images)) {
        const validImage = images.find(img => img?.url);
        return validImage?.url || '/placeholder-image.jpg';
    }
    
    return images.url || images || '/placeholder-image.jpg';
};

