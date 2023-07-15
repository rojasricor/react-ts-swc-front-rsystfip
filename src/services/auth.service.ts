import api from "./api.service";

export const auth = async (body: any) => await api.post("/auth", body);
