import { connect } from "@/dbConfig/dbConfig";
import Ressources from "@/schema/ressourcesSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deletedRessource = await Ressources.findByIdAndDelete(id);

    if (!deletedRessource) {
      return NextResponse.json(
        { error: "Ressource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Ressource deleted successfully",
      deletedRessource,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
