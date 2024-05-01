import NavBar from "../Components/Sections/NavBar";
import { cookies } from "next/headers";
export default function Template({ children }) {
  const session = cookies().get("token");
  return (
    <>
      <NavBar session={session?.value} />
      {children}
    </>
  );
}
