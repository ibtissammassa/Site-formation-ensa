import EnseignantCard from "../ui/EnseignantCard";
import JohnDoe from "../../../public/JohnDoe.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Enseignants() {
  const enseignants = [
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
    {
      name: "Fatima Hosami",
      img: JohnDoe,
      description:
        "“This course has significantly enhanced my professional life,particularly in terms of data organization.”",
      degree: "Doctorante en Apprentissage Automatique",
    },
  ];

  return (
    <div
      id="Enseignants"
      className="flex flex-col bg-red-600 text-white h-screen w-full px-44 gap-12 justify-center items-center"
    >
      <h1 className="text-4xl font-bold">Nos Enseignants</h1>
      {/* <div className="flex gap-8">
                {
                    enseignants.map((enseignant, index) => (
                        <EnseignantCard key={index} name={enseignant.name} img={enseignant.img} description={enseignant.description} degree={enseignant.degree} />
                    ))
                }
            </div> */}
      <Carousel className="w-full">
        <CarouselPrevious />
        <CarouselContent>
          {enseignants.map((enseignant, index) => (
            <CarouselItem className="basis-1/3" key={index}>
              <EnseignantCard
                name={enseignant.name}
                img={enseignant.img}
                description={enseignant.description}
                degree={enseignant.degree}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Enseignants;
