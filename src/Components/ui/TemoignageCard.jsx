import Image from "next/image";

function TemoignageCard({text, name, img}) {
    return ( 
        <div className="bg-slate-50 p-9 rounded-md flex flex-col gap-6 shadow-lg">
            <p className="text-sm text-slate-600">{text}</p>
            <div className="flex items-center gap-4">
                <Image className="rounded" src={img} alt={name} />
                <h3 className="font-semibold text-sm">{name}</h3>
            </div>
        </div>
     );
}

export default TemoignageCard;