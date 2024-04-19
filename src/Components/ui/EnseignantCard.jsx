import Image from "next/image";

function EnseignantCard({name, img, description, degree}) {
    return ( 
        <div className="flex bg-red-700 justify-center items-center flex-col w-76 p-7 gap-7 rounded-md text-center">
            <h2 className="font-bold text-2xl">{name}</h2>
            <div className="rounded-full overflow-hidden w-44 h-44">
                <Image className="w-full h-full object-cover" src={img} alt={name} />
            </div>
            <p className="text-slate-100 text-sm">{description}</p>
            <h3 className="font-bold">{degree}</h3>
        </div>
     );
}

export default EnseignantCard;