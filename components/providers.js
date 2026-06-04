"use client";

import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import { myStore } from "@/store/store";

export function AppProviders({ children }) {
  return (
    <Provider store={myStore}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        toastClassName="stoe-toast"
        progressClassName="stoe-toast-progress"
      />
    </Provider>
  );
}
