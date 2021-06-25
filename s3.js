const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId:process.env.aws_access_key,
    secretAccessKey:process.env.aws_secret_key,
    region:process.env.aws_region
})

module.exports = s3