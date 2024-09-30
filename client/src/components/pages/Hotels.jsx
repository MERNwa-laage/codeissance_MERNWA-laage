import React from 'react';
import HotelCard from '../shared/Hotelcard';
import Navbar from '../shared/Navbar';

const Hotels = () => {
  // This would typically come from an API or database
  const hotelData = [
    {
      id: 1,
      name: "Seaside Resort",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/390822683.jpg?k=48c1a8b31712953b008f37a26a358dcb4ad76d7b8fa7668c7fe6b3f63880bdee&o=&hp=1",
      rating: 4.5,
      description: "Luxurious beachfront resort with stunning ocean views.",
      price: 299
    },
    {
      id: 2,
      name: "Mountain Lodge",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/84575908.jpg?k=f1a021d7f02804779c730140bdee3df050d4a302e5ec3ec39a52eede1421aaf6&o=&hp=1",
      rating: 4.2,
      description: "Cozy lodge nestled in the heart of the mountains.",
      price: 199
    },
    {
      id: 3,
      name: "Seaside Resort",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/390822683.jpg?k=48c1a8b31712953b008f37a26a358dcb4ad76d7b8fa7668c7fe6b3f63880bdee&o=&hp=1",
      rating: 4.5,
      description: "Luxurious beachfront resort with stunning ocean views.",
      price: 299
    },
    {
      id: 4,
      name: "Seaside Resort",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/390822683.jpg?k=48c1a8b31712953b008f37a26a358dcb4ad76d7b8fa7668c7fe6b3f63880bdee&o=&hp=1",
      rating: 4.5,
      description: "Luxurious beachfront resort with stunning ocean views.",
      price: 299
    },
    // Add more hotel objects as needed
  ];

  return (<div>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelData.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Hotels;