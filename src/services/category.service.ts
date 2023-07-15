import api from "./api.service";

export const getCategories = async () => {
    const { data } = await api("/resource/categories");
    return data;
};
