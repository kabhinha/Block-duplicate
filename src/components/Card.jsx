import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ thumbnail, itemName, price, itemDescription, btnText, _id }) => {

  const navigate = useNavigate();
 
  if (thumbnail && thumbnail.includes('upload/')) {
    const split = thumbnail.split('upload/');
    thumbnail = split[0] + 'upload/w_400,h_260/' + split[1];
  }

  return (
    <div className='flex flex-col gap-2 cursor-pointer items-center w-200px'
        onClick={() =>
          navigate({
            pathname: '/productDetails',
            search: `?category=${_id}`, 
          })
        }
    >
      <img src={thumbnail} alt='grinder' width="300px" height="195" />
      <p className='font-bold text-lg'>{itemName}</p>
      <p className='text-center font-light w-[260px]'>{itemDescription.split(" ").slice(0,10).join(" ") + "..."}</p>

      {price ? <p className="text-green-600 font-semibold">Rs.  {price} </p> : null }

      {btnText ? (
        <button className='bg-slate-800 hover:bg-slate-900 py-2 px-4 text-white rounded-lg'>
          {btnText}
        </button>
      ) : null}
    </div>
  );
};

export default Card;
