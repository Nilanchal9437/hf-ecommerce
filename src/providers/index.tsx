"use client";

import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/stores";
import Loader from "@/components/Loader";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
      <Loader />
    </Provider>
  );
}
