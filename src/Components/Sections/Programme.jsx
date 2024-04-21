import SemesterCard from "../ui/SemesterCard";
import red_horiz_line from "../../../public/red-horiz-line.svg";
import red_vert_line from "../../../public/red-vertic-line.svg";
import Image from "next/image";

function Programme({format}) {
    const Programme = [
        {
            semester:1,
            points:[
                "Architecture et micro-processeurs",
                "Système d’exploitation Linux" ,
                "Réseaux informatiques" ,
                "Intelligence artificielle",
            ]
        },
        {
            semester:2,
            points:[
                "Cryptographie et Block Chain",
                "Administration système, réseaux et services",
                "Sécurité des réseaux et des logiciels" ,
                "Sécurité Offensive et technique de hacking",
            ]
        },
        {
            semester:3,
            points:[
                "Deep learning Cyber sécurité" ,
                "Cloud et Internet des objets",
                "Sécurité défensive et hardening des OS",
                "Détection et prévention d’intrusions",
            ]
        },
        {
            semester:4,
            points:[
                "Projet de fin d’étude",
            ]
        }
    ]
    return ( 
        <>
        {
            (format == 'cards') && 
                <div id="Programme" className="my-24 relative flex flex-col lg:h-screen w-full px-8 lg:px-48 2xl:px-[30rem] gap-[3.15rem] justify-center items-center">
                    <div className="flex flex-col gap-3 text-center items-center">
                        <h1 className="md:text-4xl text-3xl font-bold">Programme De Formation</h1>
                        <p className="text-slate-700 text-sm md:text-base">Protégez et Innovez : La Cybersécurité au Service de l'Intelligence Artificielle</p>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between w-full z-10">
                        <SemesterCard semester={Programme[0].semester} points={Programme[0].points}/>
                        <Image className="hidden md:block" src={red_horiz_line} alt="red-horiz-line"/>
                        <SemesterCard semester={Programme[1].semester} points={Programme[1].points}/>
                    </div>
                    <Image className="absolute top-[54%] md:top-[51%] right-[50%] md:right-[30%] z-0" src={red_vert_line} alt="red-vert-line"/>
                    <div className="flex justify-between md:flex-row flex-col w-full z-10">
                        <SemesterCard semester={Programme[3].semester} points={Programme[3].points}/>
                        <Image className="hidden md:block" src={red_horiz_line} alt="red-horiz-line"/>
                        <SemesterCard semester={Programme[2].semester} points={Programme[2].points}/>
                    </div>
                </div>     
        }
        {
            (format == 'simple') && 
            <div className='px-6 flex flex-col gap-3'>
                <h2 className='font-bold text-xl'>Programme de formation</h2>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-red-600 text-lg">Première année</h3>
                        {
                            Programme.slice(0,2).map((semester, index) => (
                                <div key={index} className='flex flex-col gap-3 pl-2'>
                                    <h4 className='text-red-600'>Semestre {semester.semester}</h4>
                                    <ul className='text-xs list-disc text-slate-800 pl-8'>
                                        {
                                            semester.points.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-red-600 text-lg">Deuxième année</h3>
                        {
                            Programme.slice(2,4).map((semester, index) => (
                                <div key={index} className='flex flex-col gap-3 pl-2'>
                                    <h4 className='text-red-600'>Semestre {semester.semester}</h4>
                                    <ul className='text-xs list-disc text-slate-800 pl-8'>
                                        {
                                            semester.points.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
        </>

     );
}

export default Programme;