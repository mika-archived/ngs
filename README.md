# ngs

ngs : transform/deliver images for you.

> NOTE: This is a experimental project, please use it at your own risk.


## Features

* Deliver WebP or Original according to the Accept header.


## Examples

### Delivery

At the first, write below markup in your HTML file(s).

```html
<img src="https://ngs.mochizuki.moe/anna.png" />
```

If your browser supports WebP, ngs returns WebP encoded image.  
However your browser doesn't supports WebP, ngs returns PNG original image.


## Deployment

1. Configure Environment Variables
2. `yarn install`
3. `yarn run build`
4. `yarn run deploy`
5. ... and you must perform the following operations on AWS console at your region.


### Add OAI Principal to S3 Bucket Policy

> This operation cannot be automated by CFn.

1. Open the CloudFront administration console.
2. Select `Origin Access Identity` in left menubar.
3. Copy OAI ID that commented `access-identity-AWS_S3_BACKEND_BUCKET_NAME.s3.amazonaws.com`.
4. Open the S3 administration console.
5. Select `AWS_S3_BACKEND_BUCKET_NAME`, `Permissions` and `Bucket Policy`.
6. Insert below JSON to `Statement` property.

```json
{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity YOUR_COPIED_OAI_ID"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::AWS_S3_BACKEND_BUCKET_NAME/*"
}
```


## Environment Variables

`ASW_S3_BACKEND_BUCKET_NAME` or `AWS_HTTPS_BACKEND_DOMAIN` is required.

| Key                          | Example Value          | Description                             |
| ---------------------------- | ---------------------- | --------------------------------------- |
| `AWS_ACM_CERTIFICATE_ARN`    | `arn:aws:acm:...`      | ACM Certificate ARN for CloudFront      |
| `AWS_CLOUDFRONT_ALIAS_NAME`  | `ngs.mochizuki.moe`    | Domain Name for delivering images       |
| `AWS_S3_BACKEND_BUCKET_NAME` | `static.mochizuki.moe` | S3 Bucket Name as Backend (optional)    |


## Stacks

* ACM
* CloudFront
* Lambda
* Lambda@Edge
* S3


## Special Thanks

* **n**ew **g**eneration**s** by THE IDOLM@STER CINDERELLA GIRLS


