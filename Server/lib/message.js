const formatMessage = (username, text) => {
    return {
        username,
        text,
        day: Date.getDay(),
        hour: Date.getHours(),
        minute: Date.getMinute(),
    };
}

module.exports = formatMessage;