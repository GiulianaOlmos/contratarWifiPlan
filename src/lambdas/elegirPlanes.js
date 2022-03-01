const AWS = require('aws-sdk');

const getParameters = (event) => {
 const urlQueue = process.env.URL_SQS || '';
 console.log(urlQueue);
 if (urlQueue === '') {
   throw new Error('La URL no existe')
 }

 const params = {
   MessageBody: JSON.stringify({
     planes: event.Input.Payload,
     taskToken: event.token
   }),
   QueueUrl: urlQueue,
 };
 return params;
};
exports.handler = async (event) => {
 try {
   const sqs = new AWS.SQS();
   console.log('event:  ', JSON.stringify(event, null, 2));
   const params = getParameters(event);
   console.log(params);
   await sqs.sendMessage(params).promise();
   return event;
 } catch (e) {
   throw new Error(e);
 }
};