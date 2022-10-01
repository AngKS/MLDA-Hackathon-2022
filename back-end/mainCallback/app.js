const AWS = require('aws-sdk')

const db = new AWS.DynamoDB.DocumentClient()

const ROUTE_KEY_CONNECT = '$connect';
const ROUTE_KEY_DISCONNECT = '$disconnect';



let addConnectionId = async (ID) => {
    const params = {
        TableName: 'Good-Vibes-user-connections',
        Item: {
            connectionId: ID,
        }
    }

    await db.put(params, (err, data) => {
        if (err) {
            console.log(err)
        }
    }).promise()

}

module.exports.goodVibesMainHandler = (event, context, callback) => {
    console.log(`[INCOMING EVENT] - ${JSON.stringify(event)}`)

    const connectionId = event.requestContext.connectionId;
    addConnectionId(connectionId).then(() => {
        callback(null, { statusCode: 200, message: "Connected!" })
    });
}
