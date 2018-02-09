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

    const config = await getConfig();
    const activeDrugs = JSON.parse(config);

    const drugs = await getDrugList();
    const drugList = JSON.parse(drugs);

    // TODO GetActive fix
    const active = Object.keys(drugList).reduce((prevState, category) => {
        prevState[category] = activeDrugs[category];
        return prevState;
    }, {})
    active['TOGGLE_ALL'] = activeDrugs['TOGGLE_ALL'];

    return active;
}