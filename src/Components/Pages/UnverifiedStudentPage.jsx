"use client";
import ProcessusInscription from "../Sections/ProcessusInscription";
import { useStore } from "@/store/zustand";
function UnverifiedStudentPage() {
  const user = useStore((state) => state.user);
  return (
    <div>
      <h1>Bonjour {user.firstname + "" + user.lastname}</h1>
      <p>
        Votre compte est pas encore verifier, vous devez terminer le processus
        d'inscription.
      </p>
      <ProcessusInscription />
      <ol>
        <li>Pre-inscription par site</li>
        <li>Deposer le dossier d'inscription</li>
        <li>Validation de dossier</li>
        <li>Validation de compte (espace connecté)</li>
      </ol>
      <div className="w-full bg-red-50 rounded-md flex flex-col gap-4 shadow-md lg:p-9 p-6">
        <h2 className="font-bold text-xl text-red-600">
          Dossier de condidature
        </h2>
        <div className="pl-5 flex flex-col gap-3">
          <div>
            <h3 className="font-bold text-sm lg:text-base">
              Deux copies légalisées du :
            </h3>
            <ul className="list-disc pl-8 lg:text-sm text-xs text-slate-800">
              <li>Baccalaureate</li>
              <li>Dernier diplôme, Bac+3 </li>
              <li>Carte d’identité nationale </li>
            </ul>
          </div>
          <h3 className="text-sm mlg:text-base font-bold">
            Deux photos d’identité{" "}
          </h3>
          <h3 className="text-sm mlg:text-base font-bold">Curriculum Vitae </h3>
          <h3 className="text-sm mlg:text-base font-bold">
            Contrat de la formation légalisée en 4 exemplaires
          </h3>
        </div>
      </div>
    </div>
  );
}

export default UnverifiedStudentPage;
