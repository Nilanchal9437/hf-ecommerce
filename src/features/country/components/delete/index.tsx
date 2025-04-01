"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import Modal from "@/components/Modal";
import deleteCountry from "@/features/country/apis/delete";

function Delete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = `${searchParams.get("id")}`;
  const dispatch = useAppDispatch();

  return (
    <Modal
      title="Confirmation"
      secondaryText="Delete country to delete from company register form"
      open={true}
      onClose={() => router.back()}
      cancelButtonText="Cancel"
      content={
        <p className="text-gray-800 text-sm">
          Are you sure you want to delete this country?
        </p>
      }
      onNext={() => dispatch(deleteCountry({ _id: id }))}
      maxWidth="xs"
      nextButtonText="Delete"
    />
  );
}

export default Delete;
