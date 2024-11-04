export interface Event {
    id: string;
    eventName: string;
    eventCategory: string;
    startTime: string;
    endTime: string;
    registered?: boolean;
}
