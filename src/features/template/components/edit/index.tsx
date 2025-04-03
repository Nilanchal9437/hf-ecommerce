/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik } from "formik";
import { useAppDispatch } from "@/hooks";
import Modal from "@/components/Modal";
import update from "@/features/template/apis/update";
import getDetail from "@/features/template/apis/getDetail";
import type { TemplateType } from "@/features/template/types";
import schema from "@/features/template/schema";

function Edit() {
  const [data, setData] = React.useState<TemplateType>({
    name: "",
    code: "",
    _id: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = `${searchParams.get("id")}`;

  const getDetails = async () => {
    const response = await dispatch(getDetail({ _id: id }));
    if (response?.status) {
      setData({ ...response?.data });
    }
  };

  React.useEffect(() => {
    if (id !== "null" && id !== "undefined") {
      getDetails();
    }
  }, [id]);

  const formref: any = React.useRef(null);

  return (
    <Modal
      title="Edit Template"
      secondaryText="Update a template to use in product"
      open={true}
      onClose={() => {
        router.back();
      }}
      cancelButtonText="Cancel"
      content={
        <Formik
          innerRef={formref}
          initialValues={{ name: data.name, code: data.code }}
          enableReinitialize
          onSubmit={(values, action) =>
            dispatch(update({ ...data, ...values }))
          }
          validationSchema={schema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}

              <label className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                name="code"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.code && (
                <p className="text-red-500 text-sm">{formik.errors.code}</p>
              )}
            </form>
          )}
        </Formik>
      }
      onNext={() => {
        formref && formref?.current?.handleSubmit();
      }}
      maxWidth="xs"
      nextButtonText="Update"
    />
  );
}

export default Edit;
