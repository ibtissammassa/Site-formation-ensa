import { create } from "zustand";
import { getDataFromToken } from "@/app/actions";

const store = (set, get) => ({
  //Loading user data
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  //User
  user: {},
  setUser: (user) => set({ user }),
  //Role
  userRole: "admin",
  setUserRole: (userRole) => set({ userRole }),
  //Courses
  courses: [],
  setCourses: (courses) => set({ courses }),
  fetchCourses: async () => {
    let { user, userRole } = get();
    // while (!user || !user.id || !user.semester) {
    //   user = await getDataFromToken();
    //   set({ user: user });
    //   console.log("user", user);
    // }
    const endpoint = ModulesEndpoint(userRole, user);
    console.log("user", user);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      if (data && data.modules) {
        const updatedCourses = await Promise.all(
          data.modules.map(async (module) => {
            // Fetch professor infos
            const profResponse = await fetch(`/api/prof/${module.profId}`);
            if (!profResponse.ok) {
              throw new Error("Failed to fetch professor data");
            }
            const profData = await profResponse.json();
            if (profData && profData.prof) {
              const { firstname, lastname, Image } = profData.prof;
              module.profInfo = { firstname, lastname, Image };
            } else {
              console.error("Prof data not found in API response");
            }

            // // Fetch resources for each chapter
            const chaptersWithResources = await Promise.all(
              module.chapitres.map(async (chapter) => {
                const chapterWithResources = { ...chapter };
                if (chapter.ressources) {
                  const ressources = await Promise.all(
                    chapter.ressources.map(async (ressource) => {
                      const resourceResponse = await fetch(
                        `/api/ressource/${ressource}`
                      );
                      if (!resourceResponse.ok) {
                        throw new Error(
                          `Failed to fetch resource with ID: ${ressource}`
                        );
                      }
                      const resourceData = await resourceResponse.json();
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

const ModulesEndpoint = (userRole, user, profId) => {
  switch (userRole) {
    case "admin":
      return "/api/module";
    case "teacher":
      return `/api/module/prof/${profId}`;
    case "student":
      return `/api/module/semester/${user.semester}`;
  }
};

export const useStore = create(store);
