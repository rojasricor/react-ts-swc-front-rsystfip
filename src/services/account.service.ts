import api from "./api.service";

export const verifyJwtForRecoverPsw = async (
    email: string,
    resetToken: string
) =>
    await api.post("/account/verify-jwt-for-recover-password", {
        resetToken,
        email,
    });

export const sendJwtForRecoverPsw = async (email: string) => {
    const { data } = await api.post("/account/send-jwt-for-recover-password", {
        email,
    });
    return data;
};

export const changePassword = async (dataUser: any) => {
    const { data } = await api.put(
        `/account/update-password/${dataUser.id}`,
        dataUser
    );
    return data;
};

export const changePasswordWithJwt = async (dataUser: string) => {
    const { data } = await api.put(`/account/update-password`, dataUser);
    return data;
};
