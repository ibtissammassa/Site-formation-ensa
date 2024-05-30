import Link from "next/link";
import { File } from "lucide-react";
function RessourceLink({ ressource, index }) {
  return (
    <div className="flex justify-between items-center" key={index}>
      <div className="inline-flex items-center my-2">
        <File />
        <Link
          href={ressource.url}
          target="_blank"
          className="text-sm underline hover:text-red-400 ml-2"
        >
          {ressource.title}
        </Link>
      </div>
    </div>
  );
}

export default RessourceLink;
