# ngs

ngs : transform/deliver images for you.

> NOTE: This is a experimental project, please use it at your own risk.
## Environment Variables

`ASW_S3_BACKEND_BUCKET_NAME` or `AWS_HTTPS_BACKEND_DOMAIN` is required.

| Key                          | Example Value          | Description                             |
| ---------------------------- | ---------------------- | --------------------------------------- |
| `AWS_ACM_CERTIFICATE_ARN`    | `arn:aws:acm:...`      | ACM Certificate ARN for CloudFront      |
| `AWS_CLOUDFRONT_ALIAS_NAME`  | `ngs.mochizuki.moe`    | Domain Name for delivering images       |
| `AWS_S3_BACKEND_BUCKET_NAME` | `ngs.mochizuki.moe`    | S3 Bucket Name as Backend (optional)    |


## Stacks

* ACM
* CloudFront
* Lambda
* Lambda@Edge
* S3


## Special Thanks

* **n**ew **g**eneration**s** by THE IDOLM@STER CINDERELLA GIRLS


