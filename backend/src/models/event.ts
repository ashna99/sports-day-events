export interface Event {
    id: number;
    eventName: string;
    eventCategory: string;
    startTime: string; 
    endTime: string;   
    createdOn: string; 
    modifiedOn: string; 
}

export interface EventResponse extends Event {
    registered: boolean;
}
