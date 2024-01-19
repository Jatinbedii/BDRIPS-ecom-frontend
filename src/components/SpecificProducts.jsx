import axios from 'axios';
import React from 'react';
import Card from './Card';

async function SpecificProducts({ type }) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/products`);

  return (
    <div className='w-full'>
      <div className="w-full grid gap-2 grid-cols-3">
        {data ? (
          data
            .filter((product) => product.category == type)
            .map((filteredData) => (
              <Card
                key={filteredData._id}
                name={filteredData.name}
                description={filteredData.description}
                price={filteredData.price}
                image={filteredData.image}
                id={filteredData._id}
              />
            ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

export default SpecificProducts;