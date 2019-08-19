import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <Link className='navLink' to='/'>Home</Link>
    <Link className='navLink' to='/archive'>Archive</Link>
    </>
  );
}

export default NavBar;