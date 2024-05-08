import { create } from "zustand";
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
    const query = ModulesQuery(userRole, user);
    try {
      const response = await fetch(`/api/module${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      if (data && data.modules) {
        const courses = data.modules;
        set({ courses: courses });
      } else {
        console.error("Courses data not found in API response");
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  //TravailAR
  travailAR: [],
  setTravailAR: (travailAR) => set({ travailAR }),
  fetchTravailAR: async () => {
    try {
      const response = await fetch("/api/travailAR");
      if (!response.ok) {
        throw new Error("Failed to fetch TravailAR");
      }
      const data = await response.json();
      if (data && data.travailARs) {
        set({ travailAR: data.travailARs });
      } else {
        console.error("TravailAR data not found in API response");
      }
    } catch (error) {
      console.error(error.message);
    }
  },
});

const ModulesQuery = (userRole, user) => {
  switch (userRole) {
    case "admin":
      return "";
    case "teacher":
      return `?prof=${user.id}`;
    case "verified student":
      return `?semester=${user.semester}`;
  }
};

export const useStore = create(store);
