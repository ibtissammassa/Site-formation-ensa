import ibnzohr from '../../../public/ibnzohr_logo.svg'
import Image from 'next/image';
import { Button } from '@/Components/ui/extension/button';

function Hero() {
    return (
        <div className="flex flex-col py-20 h-[85vh] 2xl:px-96 lg:px-56 px-8 text-center text-white gap-6 bg-cover justify-center items-center bg-[url('/ensa.png')]">
            <Image src={ibnzohr} height={80} alt="ibn zohr" />
            <h1 className='md:text-6xl 2xl:text-8xl text-4xl font-bold'>Cybersecurity & Intelligence Artificielle</h1>
            <p className='md:px-20 text-xs md:text-sm'>Formation  diplômante de l’université Ibn  Zohr assurée par des experts confirmés  évoluant en permanence dans les  domaines de cybersécurité, Cyberdéfence  et de l’intelligence artificielle.</p>
            <Button href='/Inscription'>Postulez Maintenant</Button>
        </div>
    );
}

export default Hero;