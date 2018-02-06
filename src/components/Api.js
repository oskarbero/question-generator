import * as AWS from 'aws-sdk';

AWS.config.setPromisesDependency(Promise);
AWS.config.update({ 
    region: 'us-east-1', 
    credentials: new AWS.Credentials(
        process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        process.env.REACT_APP_AWS_SECRET_ACCESS_KEY)
    });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export const getDrugList = async () => {
    const getOptions = {
        Bucket: 'question-gen-resources',
        Key: 'drugList.json'
    };
    return s3.getObject(getOptions).promise()
} 
export const getConfig = async () => {
    const getOptions = {
        Bucket: 'question-gen-resources',
        Key: 'configs.json'
    };
    return s3.getObject(getOptions).promise();
}

export const setConfig = async (body) => {
    const params = {
        Bucket: 'question-gen-resources',
        Key: 'configs.json',
        Body: JSON.stringify(body)
    };

    return s3.putObject(params).promise();
}

export const getActive = async () => {
    const activeDrugs = await getConfig();
    const drugList = await getDrugList();
    return {active: JSON.parse(activeDrugs.Body), drugList: JSON.parse(drugList.Body)};
}