import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AddToCartButton from '../../ui/AdtocartButton';
import ImageWithFallback from '../../ui/Imagewithfallback';

const Productdesc = ({ product, loading, error }) => {
  const [activeImage, setActiveImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ top: 0, left: 0 });
  const [showZoom, setShowZoom] = useState(false);

  // Set active image when product data is available
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].url);
    }
  }, [product]);

  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleMouseMove = (e) => {
    const imageElement = e.currentTarget;
    const { left, top, width, height } = imageElement.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const x = (mouseX / width) * 100;
    const y = (mouseY / height) * 100;

    setZoomPosition({ top: y, left: x });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="mx-auto mt-32 px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="w-full h-full md:col-span-4">
          <ImageWithFallback
            images={[{ url: activeImage }]}
            alt={product.name}
            className="w-full h-[56vh] object-contain cursor-pointer z-0 relative rounded-md "
            loading="lazy"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          <div className="mt-6">
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 4 },
              }}
              className="thumbnail-swiper"
            >
              {product.images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(image.url)}
                >
                  <ImageWithFallback
                    images={[{ url: image.url }]}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-[15vh] object-contain rounded-lg "
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="space-y-6 relative md:col-span-8">
          {showZoom && (
            <div className="w-full h-screen absolute top-0 rounded-lg overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoomPosition.left}% ${zoomPosition.top}%`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200%',
                  transition: 'background-position 0.1s ease',
                }}
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-700">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐ {product.rating}</span>
            <span className="text-gray-500">({product.countInStock} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-semibold text-blue-600">${product.price}</p>
            {product.discount > 0 && (
              <>
                <p className="text-lg line-through text-gray-500">${product.oldPrice}</p>
                <span className="text-sm text-green-600">{product.discount}% OFF</span>
              </>
            )}
          </div>

          <p className={`text-md font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.countInStock > 0 ? `In stock: ${product.countInStock}` : 'Out of stock'}
          </p>

          <p className="text-lg text-gray-800"><strong>Brand:</strong> {product.brand}</p>
          <p className="text-lg text-gray-800">
            <strong>Category:</strong> {product.category?.name} {product.subCat}
          </p>

          <div className="flex gap-4 mt-4">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdesc;
