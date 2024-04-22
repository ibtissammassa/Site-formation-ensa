import { FormulaireLogin } from "../../Components/Forms/FormulaireLogin";

function LoginPage() {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-1/3 h-[15vh] md:h-[80vh] bg-cover bg-[url('/ensa-agadir.jpg')] bg-right flex justify-center items-center">
        <h1 className="font-bold text-2xl text-white px-4 z-10 shadow-md">
          Bienvenue dans votre espace d'étudiant !
        </h1>
        <div className="md:w-1/3 h-[15vh] w-full md:h-[80vh] bg-gradient-to-r from-red-900 to-black opacity-50 absolute z-0"></div>
      </div>
      <div className="md:w-2/3 py-6 md:py-0 flex justify-center items-center">
        <FormulaireLogin />
      </div>
    </div>
  );
}

export default LoginPage;
