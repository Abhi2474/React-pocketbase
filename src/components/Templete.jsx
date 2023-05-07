import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { pb } from "../PocketBase";
import ModalForm from "./ModalForm";
import { useMutation, useQueryClient } from "react-query";

const Templete = ({ item }) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEdit = async () => {
    const record = await pb
      .collection("user")
      .update(`${item.id}`, { ...item });
    console.log(record);
    setIsOpen(!isOpen);
    setEditData(record);
  };

  // console.log(editData);

  const { mutate } = useMutation(
    async () => {
      return await pb.collection("user").delete(`${item.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
  const handleDelete = () => {
    mutate()
  };

  

  const handleDropDown = () => {
    setIsDropOpen(!isDropOpen);
  };

  return (
    <div className="relative">
      <div className="w-64 h-64 bg-gradient-to-r from-blue-200 to-blue-300 m-4 rounded flex items-center justify-center relative">
        <SlOptions
          onClick={handleDropDown}
          className="absolute top-1 right-2 cursor-pointer text-xl"
        />
        {/* <MyComponent/> */}
        <ul className="">
          <li>
            <b>Name:</b> {item.name}
          </li>
          <li>
            <b>Profession:</b> {item.profession}
          </li>
          <li>
            <b>Income:</b> {item.income}
          </li>
        </ul>
      </div>
      <ModalForm isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} />

      {isDropOpen && (
        <div className="absolute top-10 right-5 z-10 bg-white shadow-md w-1/4 flex items-center justify-between pb-2 rounded flex-col">
          <RiDeleteBin5Fill
            title="Delete"
            onClick={handleDelete}
            className="cursor-pointer text-2xl text-blue-600 hover:text-blue-800 my-2"
          />
          <hr className="border border-black" />
          <AiFillEdit
            title="Edit"
            onClick={handleEdit}
            className="text-2xl text-blue-600 hover:text-blue-800 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Templete;
