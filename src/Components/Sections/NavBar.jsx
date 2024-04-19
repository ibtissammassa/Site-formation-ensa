import Image from 'next/image';
import { Button } from "@/components/ui/button"

//Images
import ensa_logo from '../../../public/ensa_agadir_logo.svg'

export default function NavBar() {
    return ( 
        <div className='flex justify-between py-5 items-center px-12 '>
            <Image src={ensa_logo} width={45} alt="logo"/>
            <Button href='#'>Sign in</Button>
        </div>
     );
}