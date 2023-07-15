import axios from "axios";

export const getPngbase64 = async () => {
    const { data } = await axios("/img/admin/avatar.png", {
        responseType: "blob",
    });
    return data;
};
