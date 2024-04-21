

function SemesterCard({semester,points}) {
    return ( 
        <div className="border-2 rounded-3xl bg-white md:w-[400px] md:h-56 h-48 border-red-600 p-6 ">
            <h2 className="text-red-600 font-bold text-2xl mb-3">Semester {semester}</h2>
            <ul className="list-disc text-xs md:text-sm pl-5">
                {points.map((point,index)=>(
                    <li className="" key={index}>{point}</li>
                ))}
            </ul>
        </div>
     );
}

export default SemesterCard;