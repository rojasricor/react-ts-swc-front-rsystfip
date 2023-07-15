import api from "./api.service";

export const getDocuments = async () => {
    const { data } = await api("/resource/documents");
    return data;
};
