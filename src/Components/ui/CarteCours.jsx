import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Progress } from "@/Components/ui/progress";
import Link from "next/link";

function CarteCours({ data }) {
  const { coverImage, profImage, profName, courseName, progress, slug } = data;
  return (
    <Link href={'/my/' + slug} className="rounded-md shadow border border-gray-200 lg:w-[320px] w-full">
      <div
        id="card-header"
        className={
          "bg-cover rounded-t-md h-[100px] relative bg-[url('" +
          coverImage +
          "')]"
        }
      >
        <div className="flex flex-row items-center gap-3 justify-start absolute top-[60px] left-4 z-10">
          <Avatar className="w-[60px] h-[60px]">
            <AvatarImage src={profImage} />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <span id="nom-prof" className="font-semibold text-white ">
            {profName}
          </span>
        </div>
        <div className="h-[100px] bg-gradient-to-r from-red-900 to-black opacity-50 rounded-t-md" />
      </div>

      <div className="px-4 py-4 mt-5 ">
        <h1 id="cours" className="font-bold text-xl">
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
