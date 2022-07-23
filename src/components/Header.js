import React from 'react';
import logoPath from "../images/header_vector.svg"

function Header() {
    return (
        <header className="header">
            <img src={logoPath} className="header__image" alt="Around the US" />
        </header>
    )
}

export default Header;