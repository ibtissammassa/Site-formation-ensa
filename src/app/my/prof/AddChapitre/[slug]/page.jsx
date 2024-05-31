import FormAddChapitre from "@/Components/Forms/FormAddChapitre";
import React from "react";

const Page = ({ params }) => {
  const { slug } = params;
  return (
    <div className="mx-10 p-5 ">
      <h1 className="text-lg">Ajouté Une Chapitre pour {slug} :</h1>
      <FormAddChapitre slug={slug} />
    </div>
  );
};

export default Page;
