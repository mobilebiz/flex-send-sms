// This is your new function. To start, set the name and path on the left.

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    if (!event.body || !event.to) {
      throw new Error('Parameter error.');
    }
    const client = context.getTwilioClient();
    const res = await client.messages.create({
      body: event.body,
      from: context.SMS_FROM,
      to: event.to,
    });
    response.appendHeader('Content-Type', 'application/json');
    response.setBody({ sid: res.sid });
    return callback(null, response);
  } catch (err) {
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err.message);
    response.setStatusCode(500);
    return callback(null, response);
  }
};
