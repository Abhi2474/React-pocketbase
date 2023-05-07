import React, { useEffect, useState } from 'react'
import { pb } from '../PocketBase';
import Templete from './Templete';
import { useQuery } from 'react-query';

const GetData = () => {

	const fetchRecords = async () => {
		try {
			const records = await pb.collection('user').getFullList({
				sort: '-created',
			});
			return records
		} catch (error) {
			console.log(error);
		}
	}

	const {data, isLoading, error}  = useQuery('user', fetchRecords)
	// console.log(data);

	return (
		<div className='container px-5 flex flex-wrap  mb-20 mx-auto'>
			{ !isLoading ?
				data.map((item) => {
					return (
						<Templete key={item.id} item={item} />
					)
				})
				: ''
			}
		</div>
	)
}

export default GetData