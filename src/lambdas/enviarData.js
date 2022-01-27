const enviarData = (event) => {
    console.log('event: ', JSON.stringify(event, null, 2)); 

    console.log(JSON.parse(event.Records[0].body))

    return JSON.parse(event.Records[0].body)
}

exports.handler = (event, context, callback) => {
    callback(null, enviarData(event));
}