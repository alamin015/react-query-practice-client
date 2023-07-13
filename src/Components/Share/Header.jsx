import React from 'react'
import { NavLink } from 'react-router-dom'
import useCarts from '../../hooks/useCarts'

const Header = () => {
  const [cart] = useCarts();
  return (
    <header className='py-4 flex items-center justify-center'>
        <div className="container mx-auto flex gap-3">
            <NavLink to="/" className={({isActive}) => isActive ? 'text-red-600':''}>Home</NavLink>
            <NavLink to="/blog" className={({isActive}) => isActive ? 'text-red-600':''}>Blog</NavLink>
            <NavLink to="/all" className={({isActive}) => isActive ? 'text-red-600':''}>All users</NavLink>
            <h5>carts- {cart.length}</h5>
        </div>
    </header>
  )
}

export default Header