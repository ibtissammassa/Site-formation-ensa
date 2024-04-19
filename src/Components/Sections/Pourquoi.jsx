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
            description:"Nous croyons que la meilleure méthode d'apprentissage consiste à mettre les mains à la pâte. C'est pourquoi nos cours combinent la théorie essentielle avec des exercices pratiques. Vous aurez l'occasion de mettre en pratique tout ce que vous apprenez et de l'appliquer à des situations réelles."
        },
        {
            img:prq2,
            title:"Certification Universitaire",
            description:"À la fin de cette formation, vous aurez l'opportunité de recevoir un diplôme universitaire délivré par l'Université Ibn Zohr. Ce diplôme atteste de vos compétences et de votre réussite dans le domaine étudié, vous ouvrant ainsi de nouvelles portes dans votre parcours professionnel."
        },
        {
            img:prq3,
            title:"Formation Académique",
            description:"Dans cette formation académique, vous serez encadré par des professeurs universitaires compétents. Leur expertise dans leur domaine respectif vous garantit un enseignement de qualité et une guidance précise tout au long de votre parcours d'apprentissage."
        }
    ]

    return ( 
        <div className="flex flex-col h-[95vh] px-40 text-center gap-12 justify-center items-center">
            <h1 className="text-4xl font-bold">Pourquoi Choisir Notre Formation ?</h1>
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