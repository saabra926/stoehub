"use client";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart, closeKro } from "@/store/CreateSlice/slice";
import { toast, ToastContainer } from "react-toastify";
import React from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productSlice.cart);

  const notify = () => toast.success("Your order has been placed");

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

  return (
    <>
      <Head>
        <title>Your Shopping Cart | Dawood Shoes</title>
        <meta
          name="description"
          content="View and manage the items in your shopping cart. Proceed to checkout when ready."
        />
      </Head>

      <div className="container mt-5 mb-5">
        <h1 className="text-center mb-4 fw-bold fs-2" style={{ color: "#ff8835" }}>
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center" style={{ color: "#ff8835" }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="row g-4 justify-content-center">
              {cartItems.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  key={`${item.id}-${index}`}
                >
                  <article className="main-div text-center" aria-labelledby={`cart-item-${index}`}>
                    <img
                      className="img-ha rounded-1 img-fluid"
                      src={item.src}
                      alt={`Image of ${item.brand} - ${item.about}`}
                      loading="lazy"
                    />
                    <h2 id={`cart-item-${index}`} className="fw-bold fs-5 mt-2">
                      {item.brand}
                    </h2>
                    <p className="mb-1 font-arial">
                      <small>{item.about}</small>
                    </p>
                    <h3 className="mt-2 fs-6 text-dark">Price: ${item.price}</h3>
                    <button
                      style={{ backgroundColor: "#ff8835", border: "none" }}
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Remove from Cart
                    </button>
                  </article>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <section className="text-center mt-5">
              <h4 style={{ color: "#ff8835" }} className="fw-bold">
                Total: ${total}
              </h4>
              <button style={{ backgroundColor: "#ff8835" , color:"white" }}
                className="btn fw-bold  mt-3"
                onClick={() => {
                  handleClear();
                  notify();
                }}
              >
                Proceed to Checkout
              </button>
            </section>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
