function SemesterCard({ semester, points }) {
  return (
    <div className="border-2 rounded-3xl bg-white w-[400px] min-h-44 h-fit bg-red-900 border-red-600 p-6">
      <h2 className="text-red-600 font-bold text-2xl mb-3">
        Semester {semester}
      </h2>
      <ul className="list-disc text-sm pl-5">
        {points.map((point, index) => (
          <li className="" key={index}>
            {point}
            hello
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SemesterCard;
