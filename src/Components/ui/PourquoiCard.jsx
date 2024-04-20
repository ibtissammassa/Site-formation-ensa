import Image from "next/image";

function PourquoiCard({img,title,description}) {
    return ( 
        <div className="rounded-md shadow-lg pb-3  w-1/3 overflow-hidden">
            <Image className="w-full h-[48%] object-cover" src={img} alt={title} />
            <div className="p-6">
                <h2 className="text-red-600 text-lg font-bold">{title}</h2>
                <p className="text-xs text-slate-600 mt-2">{description}</p>
            </div>
        </div>
     );
}

export default PourquoiCard;