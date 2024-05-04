import { create } from "zustand";
// import { FetchProfInforsFromModule, FetchResourceById } from "@/utils/apiUtils";
import { getDataFromToken } from "@/app/actions";

const store = (set, get) => ({
  //Loading user data
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  //User
  user: {},
  setUser: (user) => set({ user }),
  //Role
  userRole: "teacher",
  setUserRole: (userRole) => set({ userRole }),
  //Courses
  courses: [],
  setCourses: (courses) => set({ courses }),
  fetchCourses: async () => {
    let { user, userRole } = get();
    if (!user || !user.semester || !user.id) {
      await getDataFromToken()
        .then((rs) => {
          user = rs;
        })
        .catch((error) => {
          console.error(error.message);
        });
      set({ user });
    }
    const endpoint = ModulesEndpoint(userRole, user);
    console.log("endpoint", endpoint);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      if (data && data.modules) {
        const updatedCourses = await Promise.all(
          data.modules.map(async (module) => {
            module.profInfo = await FetchProfInforsFromModule(module);
            // Fetch resources for each chapter
            const chaptersWithResources = await Promise.all(
              module.chapitres.map(async (chapter) => {
                const chapterWithResources = { ...chapter };
                if (chapter.ressources) {
                  const ressources = await Promise.all(
                    chapter.ressources.map(async (ressource) => {
                      const resourceData = await FetchResourceById(ressource);
                      return resourceData;
                    })
                  );
                  chapterWithResources.ressources = ressources;
                }
                return chapterWithResources;
              })
            );
            module.chapitres = chaptersWithResources;
            return module;
          })
        );
        set({ courses: updatedCourses });
      } else {
        console.error("Courses data not found in API response");
      }
    } catch (error) {
      console.error(error.message);
    }
  },
});

const ModulesEndpoint = (userRole, user) => {
  console.log("user", user);
  switch (userRole) {
    case "admin":
      return "/api/module";
    case "teacher":
      return `/api/module/prof/${user.id}`;
    case "student":
      return `/api/module/semester/${user.semester}`;
  }
};

const FetchProfInforsFromModule = async (module) => {
  const profResponse = await fetch(`/api/prof/${module.profId}`);
  if (!profResponse.ok) {
    throw new Error("Failed to fetch professor data");
  }
  const profData = await profResponse.json();
  if (profData && profData.prof) {
    const { firstname, lastname, Image } = profData.prof;
    return { firstname, lastname, Image };
  } else {
    console.error("Prof data not found in API response");
  }
};

const FetchResourceById = async (ressourceId) => {
  const resourceResponse = await fetch(`/api/ressource/${ressourceId}`);
  if (!resourceResponse.ok) {
    throw new Error(`Failed to fetch resource with ID: ${ressourceId}`);
  }
  const resourceData = await resourceResponse.json();
  return resourceData;
};

export const useStore = create(store);
