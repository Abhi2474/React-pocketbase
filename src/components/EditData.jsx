import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { pb } from "../PocketBase";
import { useMutation, useQueryClient } from "react-query";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  profession: Yup.string().required("profession is required"),
  income: Yup.number().required("Income is required"),
});

const label = "";
const formDiv = "flex flex-col my-2 text-lg";
const field = "rounded px-4 py-2 bg-green-950 text-white outline-none";
const errMsg = "text-red-100";

const EditData = ({ editData, toggleModal }) => {
  const queryClient = useQueryClient();

  const queryUpdate = useMutation(
    async (values) => {
      const record = await pb.collection("user").update(editData.id, values);
      return record;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const handleSubmit = async (values) => {
    try {
      await queryUpdate.mutateAsync(values);
      // Success, handle any necessary actions
    } catch (error) {
      // Handle error
      console.log(error);
    }
    toggleModal();
  };

  const initialValues = {
    name: editData.name,
    profession: editData.profession,
    income: editData.income,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="py-5 my-4 flex flex-col justify-between items-center">
            <h1 className="text-3xl text-center font-bold">Edit Data Form</h1>

            <div className={formDiv}>
              <label className={label} htmlFor="name">
                Name
              </label>
              <Field className={field} type="text" name="name" />
              <ErrorMessage className={errMsg} name="name" component="div" />
            </div>

            <div className={formDiv}>
              <label className={label} htmlFor="profession">
                Profession
              </label>
              <Field className={field} type="text" name="profession" />
              <ErrorMessage
                className={errMsg}
                name="profession"
                component="div"
              />
            </div>

            <div className={formDiv}>
              <label className={label} htmlFor="income">
                Income
              </label>
              <Field className={field} type="number" name="income" />
              <ErrorMessage className={errMsg} name="income" component="div" />
            </div>

            <button
              className="bg-green-800 my-4 px-4 rounded py-1 text-lg hover:bg-green-950 text-white font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditData;
