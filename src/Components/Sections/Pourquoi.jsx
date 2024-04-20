import PourquoiCard from "../ui/PourquoiCard";

//images
import prq1 from '../../../public/prq1.png';
import prq2 from '../../../public/prq2.png';
import prq3 from '../../../public/prq3.png';

function Pourquoi() {
    const objectifs =[
        {
            img:prq1,
            title:"Apprentissage Pratique",
            description:"Nous privilégions l'apprentissage actif : théorie fondamentale et exercices pratiques se complètent dans nos cours. Vous expérimenterez et appliquerez vos connaissances dans des contextes concrets."
        },
        {
            img:prq2,
            title:"Certification Universitaire",
            description:"À la fin de cette formation, vous obtiendrez un diplôme universitaire de l'Université Ibn Zohr, reconnaissant vos compétences et ouvrant de nouvelles opportunités dans votre parcours."
        },
        {
            img:prq3,
            title:"Formation Académique",
            description:"Dans cette formation, bénéficiez d'un encadrement par des professeurs universitaires compétents. Leur expertise assure un enseignement de qualité et une guidance précise tout au long de votre apprentissage."
        }
    ]

    return ( 
        <div className="flex my-5 flex-col h-[95vh] px-40 text-center gap-12 justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-4xl font-bold">Pourquoi Choisir Notre Formation ?</h1>
                <p className="text-slate-700"> Les Voies Innovantes de Notre Formation en Cybersecurity & Intelligence Artificielle</p>
            </div>
            <div className="flex gap-10">
                {
                    objectifs.map((objectif,index) => (
                        <PourquoiCard key={index} img={objectif.img} title={objectif.title} description={objectif.description} />
                    ))
                }
            </div>
        </div>
     );
}

export default Pourquoi;