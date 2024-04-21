import TemoignageCard from "@/Components/ui/TemoignageCard";
import JohnDoe from "../../../public/JohnDoe.png";

function Temoignage() {
    const temoignages = [
        {
            text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
            name: "John Doe",
            img: JohnDoe
        },
        {
            text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
            name: "John Doe",
            img: JohnDoe
        },
        {
            text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
            name: "John Doe",
            img: JohnDoe
        },
        {
            text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
            name: "John Doe",
            img: JohnDoe
        },
    ]

    return ( 
        <div className="flex flex-col lg:h-screen my-24 lg:my-16 pb-16 w-full px-8 lg:px-48 2xl:px-80 gap-7 justify-center items-center">
            <div className="flex flex-col gap-3 text-center items-center">
                <h1 className="md:text-4xl text-3xl font-bold">Témoignages</h1>
                <p className="text-slate-700 text-sm md:text-base">Expériences Inspirantes : Témoignages de Réussite en Cybersecurity & Intelligence Artificielle</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    temoignages.map((temoignage, index) => (
                        <TemoignageCard key={index} text={temoignage.text} name={temoignage.name} img={temoignage.img} />
                    ))
                }
            </div>
        </div>
     );
}

export default Temoignage;