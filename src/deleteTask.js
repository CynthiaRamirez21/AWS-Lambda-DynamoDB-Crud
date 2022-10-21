const AWS = require('aws-sdk');

const deleteTarea = async event => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    await dynamodb.delete({
        TableName: 'TaskTable',
        Key: {
            id,
        },
    }).promise();

    return {
        status: 200,
        body: {
            message: "Task deleted",
        },
    };

};

module.exports = {
    deleteTarea
}