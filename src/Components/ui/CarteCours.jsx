import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Progress } from "@/Components/ui/extension/progress";
import Link from "next/link";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import Image from "next/image";

function CarteCours({ data }) {
  const { coverImage, name: courseName, progress, slug, prof } = data;

  if (!data || data.length == 0) return <SkeletonCard />;

  return (
    <Link
      href={"/my/cours/" + slug}
      className="rounded-md shadow border border-gray-200 w-full"
    >
      <div
        id="card-header"
        className={
          "bg-cover bg-center rounded-t-md h-[100px] relative bg-[url('" +
          coverImage +
          "')]"
        }
      >
        {prof && (
          <div className="flex flex-row items-center gap-3 justify-start absolute top-[60px] left-4 z-10">
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage src={prof.Image} />
              <AvatarFallback>{`${prof.firstname.charAt(
                0
              )}${prof.lastname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <span id="nom-prof" className="font-semibold text-white text-sm">
              {`${prof.firstname} ${prof.lastname}`}
            </span>
          </div>
        )}

        <div className="h-[100px] bg-gradient-to-r from-red-900 to-black opacity-50 rounded-t-md" />
      </div>

      <div className="px-4 py-4 mt-5 ">
        <h1 id="cours" className="font-bold">
          {courseName}
        </h1>
        <div className="flex flex-col items-end mt-2">
          <span className="text-xs font-semibold">{progress}%</span>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </Link>
  );
}

export default CarteCours;
