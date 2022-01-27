const formatError = (event) => {
    console.log('event: ', JSON.stringify(event, null, 2)); 

    return {
        status: 500,
        estado: "Cancelado",
        cause: JSON.parse(event.Input.Cause).errorMessage
    }
}

exports.handler = (event, context, callback) => {
    callback(null, formatError(event));
}