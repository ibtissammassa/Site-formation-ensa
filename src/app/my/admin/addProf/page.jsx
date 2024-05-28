import FromAddProf from "@/Components/Forms/FormAddProf";

function AddProfPage() {
  return (
    <div className="mx-10 p-5 ">
      <h1 className="md:text-4xl text-3xl font-bold">
        Ajouter un Professeur :
      </h1>
      <FromAddProf />
    </div>
  );
}

export default AddProfPage;
