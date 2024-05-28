import FormAddModule from "@/Components/Forms/FormAddModule";
function AddModulePage() {
  return (
    <div className="mx-10 p-5 ">
      <h1 className="md:text-4xl text-3xl font-bold">
        Ajouter Module :
      </h1>
      <FormAddModule />
    </div>
  );
}

export default AddModulePage;
