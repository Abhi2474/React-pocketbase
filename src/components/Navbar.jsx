import React from 'react'
import { Link } from 'react-router-dom'


const list = 'px-3 text-white text-lg'

const Navbar = () => {
  return (
	<>
		<ul className='flex justify-center items-center bg-gray-700 py-4'>
			<li><Link className={list} to={'/'}>Home</Link></li>
			<li><Link className={list} to={'/login'}>Login</Link></li>
		</ul>
	</>
  )
}

export default Navbar