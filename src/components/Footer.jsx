import React from 'react'
import Image from 'next/image';
const Footer = () => {
    return (
        <footer className="footer border border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent text-white">
            <div className="container py-4 px-24 flex justify-between">
                <Image src = {"/PokeballFooter.png"} width = {75} height = {0} className='mx-auto lg:mx-12'></Image>
                <p className="text-slate-600"> &copy; 2024 . The Pokémon Company All rights Reserved</p>
            </div>
        </footer>
     )
}
export default Footer;