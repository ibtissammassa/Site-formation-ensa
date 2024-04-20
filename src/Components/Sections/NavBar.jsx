'use client'
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useState, useEffect } from 'react'

//Images
import ensa_logo from '../../../public/ensa_agadir_logo.svg'

export default function NavBar() {
        const [show, setShow] = useState(true);
        const [lastScrollY, setLastScrollY] = useState(0);
      
        const controlNavbar = () => {
          if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
              // if scrolling down, hide the navbar
              setShow(false);
            } else {
              // if scrolling up, show the navbar
              setShow(true);
            }
      
            // remember the current page location for the next move
            setLastScrollY(window.scrollY);
          }
        };
      
        useEffect(() => {
          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
      
            // cleanup function
            return () => {
              window.removeEventListener('scroll', controlNavbar);
            };
          }
        }, [lastScrollY]);

        const translation = show ? 'translate-y-0' : '-translate-y-full';

    return ( 
        <div className={translation+' transition-transform duration-300 transform flex justify-between py-5 items-center px-12 border-b shadow-sm sticky top-0 bg-white z-50'}>
            <Image src={ensa_logo} width={45} alt="logo"/>
            <ul>
                <Link href='/' className='text-sm hover:text-red-600 inline-block mx-5'>Home</Link>
                <Link href='/#Programme' className='text-sm hover:text-red-600 inline-block mx-5'>Programme</Link>
                <Link href='/#Enseignants' className='text-sm hover:text-red-600 inline-block mx-5'>Enseignants</Link>
                <Link href='/' className='text-sm hover:text-red-600 inline-block mx-5'>Forum</Link>
            </ul>
            <Button href='#'>Log in</Button>
        </div>
     );
}