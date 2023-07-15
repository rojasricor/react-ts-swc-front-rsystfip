import api from "./api.service";

export const getEvents = async () => {
    const { data } = await api("/schedule");
    return data;
};

export const cancellSchedule = async (scheduleData: any) => {
    const { data } = await api.patch(
        `/schedule/${scheduleData.id}`,
        scheduleData
    );
    return data;
};

export const saveSchedule = async (scheduleData: any) => {
    const { data } = await api.post("/schedule", scheduleData);
    return data;
};
