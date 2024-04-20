import TemoignageCard from "../ui/TemoignageCard";
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
        <div className="flex flex-col h-screen my-16 pb-16 w-full px-48 gap-7 justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-4xl font-bold">Témoignages</h1>
                <p className="text-slate-700">Expériences Inspirantes : Témoignages de Réussite en Cybersecurity & Intelligence Artificielle</p>
            </div>
            <div className="grid grid-cols-2 gap-10">
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