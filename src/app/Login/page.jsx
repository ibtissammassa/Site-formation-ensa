import { FormulaireLogin } from "@/Components/Forms/FormulaireLogin";

function LoginPage() {
  return (
    <div className="flex flex-row">
      <div className="w-1/3 h-[80vh] bg-cover bg-[url('/ensa-agadir.jpg')] bg-right flex justify-center items-center">
        <h1 className="font-bold text-2xl text-white px-4 z-10 shadow-md">
          Bienvenue dans votre espace d'étudiant !
        </h1>
        <div className="w-1/3 h-[80vh] bg-gradient-to-r from-red-900 to-black opacity-50 absolute z-0"></div>
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <FormulaireLogin />
      </div>
    </div>
  );
}

export default LoginPage;
