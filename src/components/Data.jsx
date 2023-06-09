import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { pb } from "../PocketBase";
import { QueryClient, useMutation, useQueryClient } from "react-query";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  profession: Yup.string().required("profession is required"),
  income: Yup.number().required("Income is required"),
});

const label = "";
const formDiv = "flex flex-col my-2 text-lg";
const field = "rounded px-4 py-2 bg-green-950 text-white outline-none";
const errMsg = "text-red-100";

const Data = () => {

  const queryClient = useQueryClient()

  const queryPost = useMutation(async (values) => {
    const record = await pb.collection("user").create(values);
    return record;
  },{
    onSuccess:()=>{
      queryClient.invalidateQueries()
    }
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await queryPost.mutateAsync(values);
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  const initialValues = { name: "", profession: "", income: "" };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="py-5 my-4 flex flex-col justify-between items-center bg-gradient-to-r from-green-500 to-green-600">
            <h1 className="text-3xl text-center font-bold">Data Form</h1>

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
              className="bg-green-100 my-4 px-4 rounded py-1 text-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Data;
