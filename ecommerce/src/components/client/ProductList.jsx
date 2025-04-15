import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const products = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Phone", price: 500 }
];

const ProductList = () => {
    const dispatch = useDispatch();

    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="border p-4 m-2">
                    <h2 className="text-xl">{product.name}</h2>
                    <p>${product.price}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 mt-2"
                        onClick={() => dispatch(addToCart(product))}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
