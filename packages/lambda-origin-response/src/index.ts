// eslint-disable-next-line no-unused-vars,import/no-unresolved
import { CloudFrontResponseEvent, CloudFrontResponseCallback, Context } from "aws-lambda";

import * as aws from "aws-sdk";
import { extname } from "path";
import * as qs from "querystring";
import sharp from "sharp";

/*
 * CloudFront OriginResponse Event
 *
 * This function processes images using request parameters.
 * 1. If origin response returned failed, get original image from backend.
 * 2. Processing image binary using parameters by sharp
 *
 */
type Parameters = {
  a?: number; // aspect
  b?: string; // background
  c?: string; // clip
  f?: string; // format
  g?: number; // g
  h?: number; // height
  o?: number; // optimize
  q?: string; // quality
  r?: string; // rotate
  u?: number; // u
  v?: number; // version
  w?: number; // width
};

const PARAMETERS_REGEX = /\/c\/(.+?)\/(.*)/;
const S3 = new aws.S3({ signatureVersion: "v4" });

exports.handler = async (event: CloudFrontResponseEvent, _context: Context, callback: CloudFrontResponseCallback) => {
  const { response } = event.Records[0].cf;
  if (response.status === "200") {
    console.log("origin response is 200 OK, through this request.");
    return callback(null, response); // through
  }
  console.log(`Backend returns HTTP Status ${response.status}.`);

  const { request } = event.Records[0].cf;
  if (!PARAMETERS_REGEX.test(request.uri)) {
    console.warn(`invalid request uri: ${request.uri}, through this request.`);
    return callback(null, response); // through
  }

  const [, params, path] = request.uri.match(PARAMETERS_REGEX)!;
  const parameters = qs.parse(params, ",") as Parameters;

  if (request.origin!.s3) {
    // backend is S3
    const domain = request.origin!.s3.domainName;
    const bucket = domain.substring(0, domain.lastIndexOf(".s3.amazonaws.com"));
    console.log(`ngs try to request image file to S3 bucket: ${bucket}, path: ${path}`);

    const r = await S3.getObject({ Bucket: bucket, Key: path }).promise();
    if (r.$response.error) {
      console.error(JSON.stringify(r.$response.error));
      return callback(null, response); // through
    }

    console.log(`ngs start to process origin image with params: ${JSON.stringify(params)}`);

    let s = sharp(r.Body as Buffer);

    if (!parameters.f) {
      parameters.f = extname(path).substring(1);
    }
    if (!parameters.q) {
      parameters.q = "75";
    }

    switch (parameters.f) {
      case "jpeg":
      case "jpg":
        s = s.jpeg({ quality: parseInt(parameters.q, 10) });
        break;

      case "png":
        s = s.png({ quality: parseInt(parameters.q, 10) });
        break;

      case "webp":
        s = s.webp({ quality: parseInt(parameters.q, 10) });
        break;

      case "tiff":
        s = s.tiff({ quality: parseInt(parameters.q, 10) });
        break;

      default:
        break;
    }

    const buffer = await s.toBuffer();
    response.status = "200";
    (response as any).body = buffer.toString("base64");
    (response as any).bodyEncoding = "base64";
    response.headers["content-type"] = [{ key: "Content-Type", value: `image/${parameters.f}` }];
    return callback(null, response);
  }

  console.warn("ngs does not support HTTPS backend yet.");
  return callback(null, response); // currently through
};
