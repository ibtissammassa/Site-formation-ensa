import ensa_logo from "../.././../public/ensa_agadir_logo.svg";
import Image from 'next/image';

function Footer() {
    return ( 
        <>
              <hr className="border-4 border-red-600 mb-4" />
      <hr className="border-2 border-red-600" />
        <div className="lg:h-[75vh] flex flex-col items-center justify-between py-10 lg:py-6 bg-red-50">
            <div className="mb-6 flex lg:px-28 px-8 w-full flex-col md:flex-row gap-7 justify-between items-center h-full">
                <div className="md:w-2/5 flex flex-col gap-3">
                    <Image src={ensa_logo} className="lg:w-36 w-24" alt="logo"/>
                    <h2 className="font-bold text-sm md:text-base">Cybersecurity & Intelligence Artificielle - ENSAA</h2>
                    <p className="lg:text-sm text-xs text-slate-700">
                    L’ENSA d’Agadir est une école d’ingénieurs
                    la plus connue et la plus performante, tant
                    dans sa région qu’au niveau national. Cela
                    n’est pas dû au hasard mais plutôt à la
                    qualité et à l’excellence des formations
                    proposées. Nous vous invitons à nous
                    rejoindre, votre réussite sera notre priorité
                    et votre confiance sera notre fierté.
                    </p>
                </div>
                <div className="md:w-1/3">
                    <h2 className="text-red-600 font-bold text-lg lg:text-xl">Contacts</h2>
                    <ul className="list-disc lg:p-5 p-3 flex flex-col gap-2 lg:gap-3 text-xs lg:text-sm">
                        <li>Tél : +212 (0) 655279232 / +212 (0)528228313 </li>
                        <li>Email : a.abenaou@uiz.ac.ma / r.ezzahir@uiz.ac.ma</li>
                        <li>site web: https://www.ensa-agdir.ac.ma</li>
                    </ul>
                </div>
            </div>
            <p className="lg:text-sm text-xs px-8 text-center text-slate-600">© 2024 Fromation Continue Ensa Agadir. All rights reserved.</p>
        </div>
        </>

     );
}

export default Footer;