"use client"
import Head from "next/head";
import "./page.css";
import { Products } from "../data";
import { AddtoCart } from "@/store/CreateSlice/slice";
import { useDispatch } from "react-redux";
import { toast , ToastContainer , Bounce } from "react-toastify";

export default function Product() {

  const dispatch = useDispatch();
  const HandleAddToCart = ((item )=> {
    dispatch(AddtoCart(item))
  })

  const notify = () => toast.success ("Product added in the Cart" , {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    transition: Bounce,
  })

  return (

    <>
       <ToastContainer 
       theme="colored"
       />

      <Head>
        <title>Shop Quality Sneakers | Dawood Shoes</title>
        <meta
          name="description"
          content="Browse our wide selection of stylish, comfortable, and performance-driven sneakers at Dawood Shoes."
        />
      </Head>

      <div className="container mt-4 mb-5">
        <h1 className="text-center text-white mb-4 fw-bold fs-2">Our Products</h1>

        <div className="row g-4 mt-4 justify-content-center">
          {Products.map((item, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              key={`${item.name}-${index}`}
            >
              <article className="main-div" aria-labelledby={`product-${index}`}>
                <img
                  className="img-ha rounded-1"
                  src={item.src}
                  alt={`${item.brand} - ${item.name}`}
                  loading="lazy"
                />
                <h2 id={`product-${index}`} className="fw-bold fs-5 font-arial text-center">
                  {item.brand}
                </h2>
                <p className="text-center font-arial mb-0">
                  <small>{item.about}</small>
                </p>
                <h3 className="mt-2 fs-6 text-dark text-center">Price: ${item.price}</h3> 
                <button aria-label={`Add ${item.brand} to cart`} onClick={() => {HandleAddToCart(item) ; notify()}}>Add to Cart</button>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
