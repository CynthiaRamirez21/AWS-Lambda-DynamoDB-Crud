//const { descriptionsContext } = require('ant-design-vue/lib/descriptions');
const AWS = require('aws-sdk');



const updateTarea = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done , title, description} = JSON.parse(event.body);

    await dynamodb.update({
        TableName: 'TaskTable',
        Key: {id},
        UpdateExpression: "set done = :done, title = :title, description = :description",
        ExpressionAttributeValues: {
            ":done": done,
            ":title": title,
            ":description": description,
        },
        ReturnValues: 'ALL_NEW'

    }).promise();

    return {
        status: 200,
        body: JSON.stringify({
            message: 'Task updated successfully'
        })
    }


};

module.exports = {
    updateTarea
}