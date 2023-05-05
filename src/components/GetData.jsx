import React, { useEffect, useState } from 'react'
import { pb } from '../PocketBase';
import Templete from './Templete';

const GetData = () => {

	const [ data, setData ] = useState([])
	
	useEffect(() => {
		async function fetchRecords() {
			const records = await pb.collection('user').getFullList({
			  sort: '-created',
			});
			console.log(records);
			setData(records)
		  }
		  fetchRecords();
	}, [])

	return (
		<div className='container px-5 flex flex-wrap  mb-20 mx-auto'>
			{
				data.map((item)=>{
					return (
						<Templete key={item.id} item={item} />
					)
				})
			}
		</div>
	)
}

export default GetData