import React, { useState } from 'react';

const Location = () => {
    const [locationText, setLocationText] = useState("Select location");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetLocation = async () => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
                    );
                    const data = await res.json();
                    const address = data.address;

                    const house = address.house_number || '';
                    const road = address.road || '';
                    const neighbourhood = address.neighbourhood || address.suburb || '';
                    const city = address.city || address.town || address.village || '';
                    const state = address.state || '';
                    const postcode = address.postcode || '';
                    const country = address.country || '';

                    const fullAddress = [
                        house && `${house} ${road}`.trim(),
                        neighbourhood,
                        city,
                        state,
                        postcode,
                        country
                    ].filter(Boolean).join(', ');

                    setLocationText(fullAddress || "Address found");
                } catch (err) {
                    setError("Failed to fetch full address");
                    setLocationText("Location found");
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setError("Permission denied or location unavailable");
                setLoading(false);
            }
        );
    };

    return (
        <button
            onClick={handleGetLocation}
            className="hidden md:flex items-center gap-2 text-sm text-neutral-700 hover:text-indigo-600 transition-all duration-300 group"
        >
            <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div className="flex flex-col items-start text-left">
                <span className="text-xs text-neutral-500">Deliver to</span>
                <span className="font-medium text-indigo-600 line-clamp-2 max-w-[200px]">
                    {loading ? "Locating..." : locationText}
                </span>
            </div>
        </button>
    );
};

export default Location;
