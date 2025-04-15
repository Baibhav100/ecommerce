import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <div>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            {cartItems.length === 0 ? <p>Cart is empty</p> : 
                cartItems.map(item => (
                    <div key={item.id} className="border p-4 m-2">
                        <h2>{item.name}</h2>
                        <p>${item.price}</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            Remove
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
