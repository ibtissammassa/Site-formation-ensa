import ibnzohr from '../../../public/ibnzohr_logo.svg'
import Image from 'next/image';
import { Button } from '../ui/button';

function Hero() {
    return ( 
        <div className="flex flex-col py-20 h-[85vh] px-72 text-center text-white gap-6 bg-cover justify-center items-center bg-[url('/ensa.png')]">
            <Image src={ibnzohr} height={80} alt="ibn zohr"/>
            <h1 className='text-6xl font-bold'>Cybersecurity & Intelligence Artificielle</h1>
            <p className='px-20 text-sm'>Formation  diplômante de l’université Ibn  Zohr assurée par des experts confirmés  évoluant en permanence dans les  domaines de cybersécurité, Cyberdéfence  et de l’intelligence artificielle.</p>
            <Button href='/Formation'>Postulez Maintenant</Button>
        </div>
     );
}

export default Hero;