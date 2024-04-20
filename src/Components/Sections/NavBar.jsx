import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link'

//Images
import ensa_logo from '../../../public/ensa_agadir_logo.svg'

export default function NavBar() {
    return ( 
        <div className='flex justify-between py-5 items-center px-12 '>
            <Image src={ensa_logo} width={45} alt="logo"/>
            <ul>
                <Link href='/' className='text-sm hover:text-red-600 inline-block mx-5'>Home</Link>
                <Link href='#Programme' className='text-sm hover:text-red-600 inline-block mx-5'>Programme</Link>
                <Link href='#Enseignants' className='text-sm hover:text-red-600 inline-block mx-5'>Enseignants</Link>
                <Link href='/' className='text-sm hover:text-red-600 inline-block mx-5'>Forum</Link>
            </ul>
            <Button href='#'>Sign in</Button>
        </div>
     );
}