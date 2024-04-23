import Image from 'next/image';
import check from '../../../public/check.svg';

function FormationCard() {
    const infos = [
        {
            title: 'Vous allez acquérir',
            points: [
                ' Des compétences en cybersécurité et en Intelligence Artificielle',
                'Savoir réaliser des tests d’intrusion : piratage, hacking, hameçonnage, phishing et filoutage Maîtriser les risques liés aux vulnérabilités des systèmes d’information',
                'Identifier les risques en cybersécurité et comprendre les différents types d’incidents de cybersécurité',
                'Maitriser les concepts du machine learning et deep learning',
                'Maitriser les techniques d’analyse et de visualisation de données',
                'Utiliser les techniques d’intelligence artificielle pour la sécurité informatique',
                'Comprendre en quoi consiste un système de gestion de la sécurité de l’information pour ensuite contribuer à sa mise en place dans l’entreprise',
                'Connaître les risques liés au cloud et comment sécuriser les outils dans le « cloud »',
                'Connaître les ressources clés qui vous permettront de vous tenir à jour en termes de cybersécurité.'
            ]
        },
        {
            title: 'Materiel inclue',
            points: [
                'Serveurs informatiques et Ordinateurs équipé des dernières versions des systèmes Linux et Windows',
                'Routeurs CISCO, les commutateurs CISCO catalyst, Security Bundle W/SEC.',
                'Supports de cours, TDs, et TPs',
            ]
        },
        {
            title: 'Condition d’accées',
            points: [
                'L’accès est ouvert à tous les titulaires d’un Bac+3 publique ou privé ou tout diplôme reconnu équivalent) en informatique ou mathématiques appliquées.',
            ]
        }
    ]
    return (
        <div className='w-full md:my-0 my-7 border rounded-md lg:p-7 p-6 flex flex-col gap-8 shadow-lg'>
            <div className="flex justify-between w-full md:text-xl text-lg font-semibold">
                <h2 className="">Prix de formation </h2>
                <h2 className="text-red-600">25000 mad/ans</h2>
            </div>
            <div className="flex flex-col gap-4">
                {
                    infos.map((info, index) => (
                        <div key={index} className='flex flex-col gap-3'>
                            <h2 className='font-bold text-red-600'>{info.title}</h2>
                            <ul className='text-xs text-slate-800 '>
                                {
                                    info.points.map((point, index) => (
                                        <div className="mb-3 inline-flex items-center" key={index}>
                                            <Image src={check} alt='check' width={16} height={16} />
                                            <li className='pl-2.5'>{point}</li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FormationCard;