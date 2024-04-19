import ensa_logo from "../.././../public/ensa_agadir_logo.svg";
import Image from 'next/image';

function Footer() {
    return ( 
        <>
              <hr className="border-4 border-red-600 mb-2" />
      <hr className="border-2 border-red-600" />
        <div className="h-[70vh]  flex flex-col items-center justify-between py-6 bg-red-50">
            <div className="flex px-28 w-full justify-between items-center h-full">
                <div className="w-2/5 flex flex-col gap-2">
                    <Image src={ensa_logo} width={135} alt="logo"/>
                    <h2 className="font-bold ">Cybersecurity & Intelligence Artificielle - ENSAA</h2>
                    <p className="text-sm text-slate-700">
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
                <div className="w-1/3">
                    <h2 className="text-red-600 font-bold text-xl">Contacts</h2>
                    <ul className="list-disc p-5 flex flex-col gap-3 text-sm">
                        <li>Tél : +212 (0) 655279232 / +212 (0)528228313 </li>
                        <li>Email : a.abenaou@uiz.ac.ma / r.ezzahir@uiz.ac.ma</li>
                        <li>site web: https://www.ensa-agdir.ac.ma</li>
                    </ul>
                </div>

            </div>
            <p className="text-sm text-slate-600">© 2024 Fromation Continue Ensa Agadir. All rights reserved.</p>
        </div>
        </>

     );
}

export default Footer;