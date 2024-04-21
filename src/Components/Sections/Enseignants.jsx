import EnseignantCard from "../ui/EnseignantCard";
import JohnDoe from "../../../public/JohnDoe.png";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

function Enseignants() {
    const enseignants = [
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
        {
            name: "Fatima Hosami",
            img: JohnDoe,
            description: "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
            degree: "Doctorante en Apprentissage Automatique"
        },
    ]
    
    return ( 
        <div id="Enseignants" className="flex flex-col bg-red-600 text-white py-28 lg:py-0 lg:h-screen w-full px-8 lg:px-44 2xl:px-80 gap-12 justify-center items-center">
            <h1 className="md:text-4xl text-3xl text-center font-bold">Nos Enseignants</h1>
            <Carousel className="lg:w-full w-4/5" >
                <CarouselPrevious />
                <CarouselContent>
                    {enseignants.map((enseignant, index) => (
                        <CarouselItem className="2xl:basis-1/4 md:basis-1/2 lg:basis-1/3" key={index}>
                            <EnseignantCard name={enseignant.name} img={enseignant.img} description={enseignant.description} degree={enseignant.degree} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div>
     );
}

export default Enseignants;