import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-white py-2 fixed top-0 left-0 w-full z-20'>
            <div className='my-container flex justify-between'>
                <img src='/logo.png' className='h-16' alt="" />
                <ul className='flex items-center gap-5 text-lg'>
                    <li><NavLink>Home</NavLink></li>
                    <li><NavLink>About</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;