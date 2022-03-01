const AWS = require('aws-sdk');

const recibirRespuesta = (event) => {
   const eventParse = JSON.parse(event.body);

   console.log(eventParse)

   return {
       output: JSON.stringify(eventParse),
       taskToken: eventParse.taskToken,
   };
};
exports.handler = async (event) => {
   const params = recibirRespuesta(event);
   try {
       const stepfunctions = new AWS.StepFunctions();
       console.log(
           `Llamando a la stepFunction con estos parametros ${JSON.stringify(
               params
           )}`
       );
       await stepfunctions.sendTaskSuccess(params).promise();
       return {
           statusCode: 200,
           body: JSON.stringify(params),
       };
   } catch (error) {
       return {
           statusCode: 500,
           body: JSON.stringify(error),
       };
   }
};