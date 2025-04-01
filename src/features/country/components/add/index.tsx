"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { useAppDispatch } from "@/hooks";

// Global Components
import Modal from "@/components/Modal";

import create from "@/features/country/apis/add";
import type { CountryType } from "@/features/country/types";
import schema from "@/features/country/schema";

function Add() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const formref: any = React.useRef<any>(null);

  const initialValues: CountryType = {
    name: "",
    code: "",
    status: true,
  };

  return (
    <Modal
      title="Add Country"
      secondaryText="Create a new country to use in company register"
      open={true}
      onClose={() => {
        router.back();
      }}
      cancelButtonText="Cancel"
      content={
        <Formik
          innerRef={formref}
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, action) => dispatch(create({ ...values }))}
          validationSchema={schema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:ring-2 focus:ring-blue-500 ${
                    formik?.errors?.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formik?.errors?.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-1 mt-4"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:ring-2 focus:ring-blue-500 ${
                    formik?.errors?.code ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formik?.errors?.code && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.code}
                  </p>
                )}
              </div>
            </form>
          )}
        </Formik>
      }
      onNext={() => {
        formref && formref?.current?.handleSubmit();
      }}
      maxWidth="xs"
      nextButtonText="Add"
    />
  );
}

export default Add;
