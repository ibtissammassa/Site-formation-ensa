import Image from "next/image";

function TemoignageCard({text, name, img}) {
    return ( 
        <div className="bg-slate-50 p-9 rounded-md flex flex-col gap-6 shadow-lg">
            <p className="text-sm text-slate-600">{text}</p>
            <div className="flex items-center gap-4">
                <div className="rounded w-14 h-12 overflow-hidden">
                <Image className="w-full h-full object-cover"  src={img} alt={name} />
                </div>
                <h3 className="font-semibold text-sm">{name}</h3>
            </div>
        </div>
     );
}

export default TemoignageCard;