import SemesterCard from "../ui/SemesterCard";
import red_horiz_line from "../../../public/red-horiz-line.svg";
import red_vert_line from "../../../public/red-vertic-line.svg";
import Image from "next/image";

function Programme() {
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
        <div className="relative flex flex-col h-screen w-full px-48 gap-[3.25rem] justify-center items-center">
            <h1 className="text-4xl font-bold">Programme De Formation</h1>
            <div className="flex justify-between w-full z-10">
                <SemesterCard semester={Programme[0].semester} points={Programme[0].points}/>
                <Image src={red_horiz_line} alt="red-horiz-line"/>
                <SemesterCard semester={Programme[1].semester} points={Programme[1].points}/>
            </div>
            <Image className="absolute top-[53%] right-1/4 z-0" src={red_vert_line} alt="red-vert-line"/>
            <div className="flex justify-between w-full z-10">
                <SemesterCard semester={Programme[3].semester} points={Programme[3].points}/>
                <Image src={red_horiz_line} alt="red-horiz-line"/>
                <SemesterCard semester={Programme[2].semester} points={Programme[2].points}/>
            </div>
        </div>
     );
}

export default Programme;