import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";

function CarteProfile() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center">
      <h3 className="text-sm font-meduim text-gray-900">
        Naoufaljrh2000@gmail.com
      </h3>
      <Avatar className="h-[80px] w-[80px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>TM</AvatarFallback>
      </Avatar>
      <h1 className="text-lg font-bold">Jrhaider Naoufal</h1>
      <h2 className="text-sm font-medium text-gray-500">
        Cybersecurity & Intelligence Artificielle
      </h2>
      <span className="text-xs text-muted-foreground">
        Première année, Semester 2
      </span>

      <Button variant="ghost" className="w-full border-t mt-2">
        <LogOutIcon />
        Déconnecté
      </Button>
    </div>
  );
}

export default CarteProfile;
