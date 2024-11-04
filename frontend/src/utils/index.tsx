const formatDateTime = (time: string | Date) => {
    const date = new Date(time);
    
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
    
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);

    return `${formattedDate}, ${formattedTime}`;
};

export default formatDateTime;