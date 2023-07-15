import api from "./api.service";

export const createCancellation = async (cancellationData: any) => {
    const { data } = await api.post("/cancellation", {
        person_id: cancellationData.id,
        cancelled_asunt: cancellationData.cancelled_asunt,
    });
    return data;
};
