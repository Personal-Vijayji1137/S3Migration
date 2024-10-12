'use server'
import AWS from "aws-sdk"
export async function copyS3Bucket(sourceBucket, destinationBucket) {
    console.log('Migration Started')
    const account1 = {
        accessKeyId: sourceBucket.secretId,
        secretAccessKey: sourceBucket.secretKey,
        region: sourceBucket.region,
    };
    const account2 = {
        accessKeyId: destinationBucket.secretId,
        secretAccessKey: destinationBucket.secretKey,
        region: destinationBucket.region,
    };
    console.log('Migration Started')
    try {
        const s3Account1 = new AWS.S3(account1);
        const s3Account2 = new AWS.S3(account2);

        const listParams = {
            Bucket: sourceBucket.bucketName
        };
        let items = await s3Account1.listObjectsV2(listParams).promise();
        const copyPromises = items.Contents.map(async (item) => {
            let copyParams = {
                Bucket: destinationBucket.bucketName,
                CopySource: `${sourceBucket.bucketName}/${item.Key}`,
                Key: item.Key
            };
            return s3Account2.copyObject(copyParams).promise();
        });
        await Promise.all(copyPromises);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}