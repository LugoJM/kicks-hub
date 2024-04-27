'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity : number;
    onQuantityChange : (count : number) => void;
}

export const QuantitySelector = ( { quantity, onQuantityChange } : Props) => {
  const onValueChange = (value : number) => {
    if(quantity + value < 1) return;

    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex">
        <button onClick={() => onValueChange(-1)}>
            <IoRemoveCircleOutline size={30}/>
        </button>
        
        <span className="flex items-center justify-center w-20 mx-3 px-5 bg-gray-200 rounded-md">{quantity}</span>
        
        <button onClick={() => onValueChange(1)}>
            <IoAddCircleOutline size={30}/>
        </button>
    </div>
  )
}
