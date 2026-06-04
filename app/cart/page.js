"use client";

import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart, closeKro } from "@/store/CreateSlice/slice";
import { toast } from "react-toastify";
import { apiRequest } from "@/lib/api/client";
import "./page.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productSlice.cart);

  const handleClear = () => {
    dispatch(closeKro());
  };

  const total = cartItems
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  const handleRemoveFromCart = (removeIndex) => {
    const newCart = [...cartItems];
    newCart.splice(removeIndex, 1);
    dispatch(RemoveFromCart(newCart));
  };

  const handleCheckout = async () => {
    if (!cartItems.length) {
      toast.info("Your cart is empty");
      return;
    }

    try {
      const data = await apiRequest("/api/orders", {
        method: "POST",
        body: { items: cartItems },
      });
      handleClear();
      toast.success(`${data.message} Total: $${Number(data.total).toFixed(2)}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="page-shell cart-page">
      <div className="cart-heading">
        <p className="cart-kicker">Shopping bag</p>
        <h1 className="section-title">Your Cart</h1>
      </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item, index) => (
                  <article className="cart-card" aria-labelledby={`cart-item-${index}`} key={`${item.id}-${index}`}>
                    <img
                      className="cart-image"
                      src={`/${item.src}`}
                      alt={`Image of ${item.brand} - ${item.about}`}
                      loading="lazy"
                    />
                    <div className="cart-copy">
                      <h2 id={`cart-item-${index}`}>{item.brand}</h2>
                      <p>{item.about}</p>
                      <strong>${Number(item.price).toFixed(2)}</strong>
                    </div>
                    <button
                      type="button"
                      className="stoe-button danger cart-remove"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Remove
                    </button>
                  </article>
              ))}
            </div>

            <section className="cart-summary stoe-panel">
              <div>
                <span>Total</span>
                <strong>${total}</strong>
              </div>
              <button
                type="button"
                className="stoe-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </section>
          </>
        )}
    </section>
  );
}
