import formation from "../../../public/Formation.png";
import Image from "next/image";
import FormationCard from "@/Components/Sections/FormationCard";
import ProcessusInscription from "@/Components/Sections/ProcessusInscription";
import FormulaireInscription from "@/Components/Forms/FormulaireInscription";
import Programme from "@/Components/Sections/Programme";

function Formation() {
    return ( 
        <div className="lg:px-28 px-8 2xl:px-80 py-8 flex gap-9 flex-col">
            <div className="flex flex-col gap-3">
                <h1 className="md:text-4xl text-3xl font-bold">Cybersecurity & Intelligence Artificielle</h1>
                <p className="text-slate-700 md:text-sm text-xs">Sécurité Informatique & Intelligence Artificielle : Renforcer les Défenses Numériques pour Demain</p>
            </div>  
            <div className="flex flex-col md:flex-row justify-between w-full">
                <div className='md:w-[51%] flex flex-col gap-7'>
                    <div className=' overflow-hidden rounded-md lg:h-[22rem]'>
                        <Image className='w-full h-full object-cover' src={formation} alt="formation" />
                    </div>
                    <div className='lg:px-6 px-2 flex flex-col gap-3'>
                        <h2 className='font-bold text-xl'>Description de formation</h2>
                        <p className='lg:text-sm text-xs text-slate-700 lg:pl-2'>
                        La formation diplômante de l'Université Ibn Zohr offre une opportunité exceptionnelle aux étudiants intéressés par la cybersécurité, la cyberdéfense et l'intelligence artificielle. 
                        </p>
                        <p className='lg:text-sm text-xs text-slate-700 lg:pl-2'>
                        Dispensée par des experts confirmés et constamment actualisée, cette formation combine théorie et pratique pour développer des compétences recherchées dans ces domaines en pleine évolution. Les étudiants bénéficient d'un enseignement de qualité, axé sur les dernières avancées technologiques, et obtiennent un diplôme reconnu, ouvrant ainsi des portes vers des carrières prometteuses dans le monde numérique.
                        </p>
                    </div>
                    <div className='lg:px-6 px-2 flex flex-col gap-3'>
                        <h2 className='font-bold text-xl'>Modalité</h2>
                        <ul className='lg:text-sm text-xs list-disc text-slate-800 pl-3 md:pl-6'>
                            <li>Diplôme délivré : Diplôme d’Université Ibn Zohr </li>
                            <li>Coût de formation: 25000 Dh par an + 500Dh Frais de dossier </li>
                            <li>Durée de la formation : 2 ans</li>
                            <li>Déroulement de la formation: Samedi, Dimanche, et possiblement le soir des autres jours.</li>
                            <li>Lieu de formation: ENSA Agadir</li>
                        </ul>
                    </div>
                    <Programme format='simple' />
                </div>
                <div className='md:w-[46%] flex flex-col gap-9'>
                    <FormationCard />
                    <ProcessusInscription />
                </div>
            </div>
            <div className='w-full bg-red-50 rounded-md flex flex-col gap-4 shadow-md lg:p-9 p-6'>
                <h2 className='font-bold text-xl text-red-600'>Dossier de condidature</h2>
                <div className='pl-5 flex flex-col gap-3'>
                    <div>
                        <h3 className='font-bold text-sm lg:text-base'>Deux copies légalisées du :</h3>
                        <ul className='list-disc pl-8 lg:text-sm text-xs text-slate-800'>
                            <li>Baccalaureate</li>
                            <li>Dernier diplôme, Bac+3 </li>
                            <li>Carte d’identité nationale </li>
                        </ul>
                    </div>
                    <h3 className='text-sm mlg:text-base font-bold'>Deux photos d’identité </h3>
                    <h3 className='text-sm mlg:text-base font-bold'>Curriculum Vitae </h3>
                    <h3 className='text-sm mlg:text-base font-bold'>Contrat de la formation légalisée en 4 exemplaires</h3>
                </div>
            </div>
            <FormulaireInscription />
    </div>
  );
}

export default Formation;
