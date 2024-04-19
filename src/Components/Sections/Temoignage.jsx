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
        <div className="flex flex-col h-screen pb-16 w-full px-48 gap-12 justify-center items-center">
            <h1 className="text-4xl font-bold">Témoignages</h1>
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