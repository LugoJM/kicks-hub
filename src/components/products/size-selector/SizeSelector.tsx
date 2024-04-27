import clsx from "clsx";


interface Props {
    selectedSize? : string;
    availableSizes : string[];
    onSizeSelected : (size : string) => void;
}

export const SizeSelector = ({selectedSize, availableSizes, onSizeSelected} : Props) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Available Sizes</h3>

        <div className="flex">
            {
                availableSizes.map(size => (
                    <button 
                        key={size} 
                        onClick={() => onSizeSelected(size)}
                        className={
                            clsx(
                                "mx-2 hover:underline text-lg",
                                {
                                    "underline" : size === selectedSize
                                }
                            )
                        }
                    >
                        {size}
                    </button>
                ))
            }
        </div>
    </div>
  )
}
