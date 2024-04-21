import CarteActiviteARendre from "@/Components/ui/CarteActiviteARendre";
import CarteCours from "@/Components/ui/CarteCours";
import { ScrollArea } from "@/Components/ui/scroll-area";

function My() {
  const todos = [
    {
      travail: "Rapport de TP",
      cours: "Cryptography and Block-chaine",
      delais: "20/03/2024 00:00",
      rendu: 0,
    },
    {
      travail: "Rapport de TD",
      cours: "Réseaux informatiques",
      delais: "05/07/2024 22:30",
      rendu: 0,
    },
    {
      travail: "Devoire Maison",
      cours: "Système d’exploitation Linux",
      delais: "20/03/2024 00:00",
      rendu: 1,
    },
    {
      travail: "Rapport de TP",
      cours: "Cryptography and Block-chaine",
      delais: "20/03/2024 00:00",
      rendu: 1,
    },
    {
      travail: "Rapport de TP",
      cours: "Cryptography and Block-chaine",
      delais: "20/03/2024 00:00",
      rendu: 1,
    },
    {
      travail: "Rapport de TP",
      cours: "Cryptography and Block-chaine",
      delais: "20/03/2024 00:00",
      rendu: 1,
    },
  ];
  const courses = [
    {
      coverImage: "/ensa-agadir.jpg",
      profImage: "https://github.com/shadcn.png",
      profName: "Toumanari Mohamed",
      courseName: "Architecture et Micro-processeur",
      progress: 10,
    },
    {
      coverImage: "/ensa-agadir.jpg",
      profImage: "https://github.com/shadcn.png",
      profName: "Samira Tourabi",
      courseName: "Système d’exploitation Linux",
      progress: 0,
    },
    {
      coverImage: "/ensa-agadir.jpg",
      profImage: "https://github.com/shadcn.png",
      profName: "Mohamed Eloumari",
      courseName: "Réseaux informatiques",
      progress: 50,
    },
    {
      coverImage: "/ensa-agadir.jpg",
      profImage: "https://github.com/shadcn.png",
      profName: "Omar Charf",
      courseName: "Réseaux informatiques",
      progress: 80,
    },
  ];
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
