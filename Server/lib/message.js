const formatMessage = (username, text) => {
    let date = new Date();
    return {
        username,
        text,
        day: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    };
}

module.exports = formatMessage;