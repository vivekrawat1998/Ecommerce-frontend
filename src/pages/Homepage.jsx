import React from 'react'
import Produxtspage from './Produxtspage'
import HotDealsBanner from '../components/Banner/Banner'
import Featureproducts from './Featureproducts'
const Homepage = () => {
  return (
    <div className=' mt-20' >
      <HotDealsBanner />
      <Featureproducts />
      <Produxtspage />
    </div>
  )
}

export default Homepage