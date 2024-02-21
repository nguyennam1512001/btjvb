import React from 'react';
import clsx from 'clsx';
import NavBar from './NavBar';

function Header() {
    return (
        <header className={clsx('wrapper')}>
            <NavBar></NavBar>
        </header>
    );
}

export default Header;
