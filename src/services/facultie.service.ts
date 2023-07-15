import api from "./api.service";

export const getFaculties = async () => {
    const { data } = await api("/resource/faculties");
    return data;
};
