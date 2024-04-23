import CarteActiviteARendre from "@/Components/ui/CarteActiviteARendre";
import CarteCours from "@/Components/ui/CarteCours";
import { ScrollArea } from "@/Components/ui/scroll-area";

//data
import { courses } from "@/data/courses";
import { todos } from "@/data/todos";

function My() {

  return (
    <div className="lg:px-28 px-8 2xl:px-80 py-8 flex md:flex-row flex-col gap-2 ">
      <main className="lg:w-2/3 w-full">
        <h1 className="text-xl font-bold mb-4">Mes Cours</h1>
        <div className="flex flex-row flex-wrap gap-2">
          {courses.map((data, index) => (
            <CarteCours key={index} data={data} />
          ))}
        </div>
      </main>
      <aside className="lg:w-1/3 w-full">
        <div className="p-4 rounded-md border border-gray-200 shadow-md">
          <h1 className="text-lg font-semibold mb-4">Activité A Rendre</h1>
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

export default My;
