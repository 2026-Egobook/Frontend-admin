import { publicAPI } from "@/shared/api/apiInstance";

export async function loginAdmin(payload) {
  const { data } = await publicAPI.post("/admin/login", payload);
  return data;
}