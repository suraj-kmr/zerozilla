const SUCCESS_RESPONSE = (message, response) => {
    return {
        success: true,
        message: message,
        response: response,
    };
}

const FAILURE_RESPONSE = (message) => {
    return {
        success: false,
        message: message
    };
}

module.exports = {
    SUCCESS_RESPONSE,
    FAILURE_RESPONSE
}