import { cookies } from "next/headers";
import type { userType } from "@/layouts/types";
import { cookies as cook } from "@/configs";

async function useUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(cook.user)?.value;

  const user: userType = userCookie
    ? safeJsonParse(userCookie)
    : { id: "", email: "", phone: 1111111111,  company_id: "", role: null };

  // Safe JSON parse function
  function safeJsonParse(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return { id: "", email: "", phone: 1111111111,  company_id: "", role: null };
    }
  }

  return user;
}

export default useUser;
