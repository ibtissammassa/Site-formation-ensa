import { LoaderIcon } from "lucide-react";

function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderIcon className="h-9 w-9 animate-spin" />
    </div>
  );
}

export default Loader;
