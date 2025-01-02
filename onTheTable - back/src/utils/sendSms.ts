
const AWS = require('aws-sdk');


export const sendSms = async(numero: string, message: string) => {
  AWS.config.update({
    region: 'us-east-1',
  });
  let params = {
    Message: "OntheTable - "+message, /* required */
    PhoneNumber: numero,
  };

    var publishTextPromise = new AWS.SNS().publish(params).promise();
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(function (data) {
      console.log(data)
        console.log("MessageID is " + data.MessageId);
    }).catch(function (err) {
        console.error(err, err.stack);
    });
}
