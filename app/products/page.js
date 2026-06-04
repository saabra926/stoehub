"use client";

import "./page.css";
import { Products } from "../data";
import { AddtoCart } from "@/store/CreateSlice/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Product() {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(AddtoCart(item));
    toast.success(`${item.brand} added to cart`);
  };

  return (
    <section className="page-shell products-page">
      <div className="products-heading">
        <p className="products-kicker">Fresh drops</p>
        <h1 className="section-title">Our Products</h1>
        <p className="section-subtitle">
          Pick from comfortable everyday sneakers, runners, and street-ready pairs.
        </p>
      </div>

      <div className="product-grid">
          {Products.map((item, index) => (
            <article className="product-card" aria-labelledby={`product-${index}`} key={`${item.id}-${index}`}>
              <div className="product-image-wrap">
                <img
                  className="product-image"
                  src={`/${item.src}`}
                  alt={`${item.brand} shoe`}
                  loading="lazy"
                />
              </div>
              <div className="product-copy">
                <h2 id={`product-${index}`}>{item.brand}</h2>
                <p>{item.about}</p>
              </div>
              <div className="product-actions">
                <span>${Number(item.price).toFixed(2)}</span>
                <button
                  type="button"
                  className="stoe-button product-button"
                  aria-label={`Add ${item.brand} to cart`}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
