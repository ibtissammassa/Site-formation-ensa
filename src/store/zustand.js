import { create } from "zustand";
import { FetchProfInforsFromModule, FetchResourceById } from "@/utils/apiUtils";
import { getDataFromToken } from "@/app/actions";
import { UserRoles } from "@/schema/userRoles";

const store = (set, get) => ({
  //Loading user data
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  //User
  user: {},
  setUser: (user) => set({ user }),
  //Role
  userRole: "",
  setUserRole: (userRole) => set({ userRole }),
  //Courses
  courses: [],
  setCourses: (courses) => set({ courses }),
  fetchCourses: async () => {
    let { user, userRole } = get();
    if (!user || !user.semester || !user.id || !userRole) {
      await getDataFromToken()
        .then((rs) => {
          user = rs;
          userRole = rs.role;
        })
        .catch((error) => {
          console.error(error.message);
        });
      set({ user });
      set({ userRole });
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
    case "verified student":
      return `/api/module/semester/${user.semester}`;
  }
};

export const useStore = create(store);
