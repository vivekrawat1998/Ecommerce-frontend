// WishList.jsx
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const WishList = ({
    showBadge = true,
    iconSize = 'h-6 w-6',
    iconColor = 'text-neutral-700',
    hoverColor = 'group-hover:text-black',
    wrapperStyle = 'p-2 hover:bg-blue-400 rounded-full',
    badgeStyle = 'absolute -top-1 -right-1'
}) => {

    const wishitems = useSelector((state) => state?.wish?.wish)
    console.log(wishitems)
    const totalcount = wishitems.length;
    return (
        <button
            className={`relative group ${wrapperStyle} cursor-pointer transition-all duration-300`}
        >
            <AiOutlineHeart className={`${iconSize} ${iconColor} ${hoverColor}`} />

            {showBadge && (
                <span
                    className={`${badgeStyle} bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md`}
                >
                    {totalcount}
                </span>
            )}
        </button>
    )
}

export default WishList
