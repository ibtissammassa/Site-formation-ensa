import CarteActiviteARendre from "@/Components/ui/CarteActiviteARendre";
import CarteCours from "@/Components/ui/CarteCours";
import { ScrollArea } from "@/Components/ui/scroll-area";

//data
import { courses } from "@/data/courses";
import { todos } from "@/data/travailAR";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="lg:px-28 px-8 2xl:px-80 py-8 flex md:flex-row flex-col gap-2 ">
      <main className="lg:w-2/3 w-full">
        <h1 className="text-xl font-bold mb-4">Cours Actuels</h1>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mb-1">
          {courses.map((data, index) => (
            <CarteCours key={index} data={data} />
          ))}
        </div>
        <Link className="underline text-red-600 font-semibold" href="/my/cours">
          Voir tous les cours
        </Link>
      </main>
      <aside className="lg:w-1/3 w-full">
        <div className="p-4 rounded-md border border-gray-200 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold mb-4">Activité A Rendre</h1>
            <Link
              className="underline text-red-600 font-semibold"
              href="/my/travail-a-rendre"
            >
              Voir Tous
            </Link>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="mr-3">
              {todos.map((todo) => (
                <CarteActiviteARendre data={todo} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
