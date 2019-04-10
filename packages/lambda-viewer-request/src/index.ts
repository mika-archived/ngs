// eslint-disable-next-line no-unused-vars,import/no-unresolved
import { CloudFrontRequestCallback, CloudFrontRequestEvent, Context } from "aws-lambda";
import { extname } from "path";
import * as qs from "querystring";

/*
 * CloudFront ViewerRequest Event
 *
 * This function rewrites request URL for origin access and process parameters such as URL query parameter and ImageFlux parameters.
 * Rewritten URL has `transformed_` prefix and formatted parameter such as `(${key1=value1,key2=...})`.
 * For example;
 * * https://ngs.mochizuki.moe/anna.png
 *    * If supported WebP : /anna.png_transformed.webp
 *    * If not supported  : /anna.png
 *
 * * https://ngs.mochizuki.moe/anna.png?w=128&h=128
 * * https://ngs.mochizuki.moe/c/w=128,h=128/anna.png
 *    *                   : /anna.png_transformed_(h=128,w=128).png
 *
 * * https://ngs.mochizuki.moe/anna.png?w=128&h=128&f=auto
 * * https://ngs.mochizuki.moe/c/w=128,h=128,f=auto/anna.png
 *    * If supported WebP : /anna.png_transformed_(h=128,w=128).webp
 *    * If not supported  : /anna.png_transformed_(h=128,w=128).png
 */
type Parameters = {
  a?: number; // aspect
  b?: string; // background
  c?: string; // clip
  f?: string; // format
  g?: number; // g
  h?: number; // height
  o?: number; // optimize
  q?: number; // quality
  r?: string; // rotate
  u?: number; // u
  v?: number; // version
  w?: number; // width
};

const ACCEPTED_PARAMS = ["a", "b", "c", "g", "h", "o", "q", "r", "u", "v", "w"];
const SUPPORTED_INPUT_FORMATS = ["jpeg", "jpg", "png", "webp", "tiff", "gif", "svg"];
const SUPPORTED_OUTPUT_FORMATS = ["jpeg", "jpg", "png", "webp", "tiff"];

const ifx = /\/c\/(.*)?\//;

exports.handler = (event: CloudFrontRequestEvent, _context: Context, callback: CloudFrontRequestCallback) => {
  const { request } = event.Records[0].cf;
  const { headers } = request;

  let path: string;
  let parameters: Parameters;
  if (ifx.test(request.uri)) {
    const matches = request.uri.match(ifx)!;
    path = request.uri.replace(matches[0], "/");
    parameters = qs.parse(matches[1], ",") as Parameters;
  } else {
    path = request.uri;
    parameters = qs.parse(request.querystring) as Parameters;
  }

  if (!SUPPORTED_INPUT_FORMATS.includes(extname(path.toLowerCase()).substring(1))) {
    return callback(null, request); // through
  }

  const acceptWebP = headers.accept ? headers.accept[0].value.includes("image/webp") : false;

  if (Object.keys(parameters).length === 0) {
    // no parameters, process Accept header only
    request.uri = acceptWebP ? `${request.uri}_transformed.webp` : request.uri;
    console.log(`Request URI rewritten to ${request.uri}`);
    return callback(null, request);
  }

  const ext = extname(path).substring(1);
  const query = Object.keys(parameters)
    .sort()
    .filter(w => ACCEPTED_PARAMS.includes(w))
    .map(w => `${w}=${(parameters as any)[w]}`)
    .join(",");

  if (parameters.f) {
    let format = parameters.f;
    if (!SUPPORTED_OUTPUT_FORMATS.includes(format) && format !== "auto") {
      return callback(null, request); // through
    }

    if (parameters.f === "auto") {
      format = acceptWebP ? "webp" : ext;
    }
    request.uri = `${path}_transformed_(${query}).${format}`;
  } else {
    request.uri = `${path}_transformed_(${query}).${ext}`;
  }

  console.log(`Request URI rewritten to ${request.uri}`);
  return callback(null, request);
};
