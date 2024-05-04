import axios from "axios";

export async function FetchProfInforsFromModule(module) {
  try {
    const profResponse = await axios.get(`/api/prof/${module.profId}`);
    console.log("profResponse", profResponse);
    if (profResponse.status !== 200) {
      throw new Error("Failed to fetch professor data");
    }
    const profData = profResponse.data;
    if (profData && profData.prof) {
      const { firstname, lastname, Image } = profData.prof;
      return { firstname, lastname, Image };
    } else {
      console.error("Prof data not found in API response");
    }
  } catch (error) {
    console.error("Error fetching professor data:", error.message);
  }
}

export async function FetchResourceById(ressourceId) {
  try {
    const resourceResponse = await axios.get(`/api/ressource/${ressourceId}`);
    if (resourceResponse.status !== 200) {
      throw new Error(`Failed to fetch resource with ID: ${ressourceId}`);
    }
    const resourceData = resourceResponse.data;
    return resourceData;
  } catch (error) {
    console.error("Error fetching resource:", error.message);
  }
}
