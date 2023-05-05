import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import { pb } from '../PocketBase';
import ModalForm from './ModalForm';

const Templete = ({item}) => {

	const [isOpen, setIsOpen] = useState(false);

	const handleEdit = async()=>{
		const record = await pb.collection('user').update(`${item.id}`, {...item});
		console.log(record);
		setIsOpen(!isOpen)
	}

  return (
	<>
	<div className='w-64 h-64 bg-gradient-to-r from-blue-200 to-blue-300 m-4 rounded flex items-center justify-center relative'>
		<ul className=''>
			<li><b>Name:</b> {item.name}</li>
			<li><b>Profession:</b> {item.profession}</li>
			<li><b>Income:</b> {item.income}</li>
		</ul>
		<AiFillEdit onClick={handleEdit} className='absolute right-1 bottom-1 text-2xl text-blue-400 hover:text-blue-800 cursor-pointer'/>

	</div>
	<ModalForm isOpen={isOpen} setIsOpen={setIsOpen} />
	</>
  )
}

export default Templete