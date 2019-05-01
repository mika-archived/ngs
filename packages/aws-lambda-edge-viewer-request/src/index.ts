// eslint-disable-next-line import/no-unresolved
import { CloudFrontRequestCallback, CloudFrontRequestEvent, Context } from "aws-lambda";
import { rewrite, KeyValuePair } from "./shared/rewriter";

/*
 * CloudFront ViewerRequest Event
 */
const handler = async (event: CloudFrontRequestEvent, _context: Context, callback: CloudFrontRequestCallback) => {
  const { request } = event.Records[0].cf;

  // headers to KVP
  const headers: KeyValuePair = {};
  Object.keys(request.headers).forEach(w => {
    headers[w] = request.headers[w].map(v => v.value).join("");
  });

  const uri = request.querystring ? `${request.uri}?${request.querystring}` : request.uri;
  request.uri = await rewrite(uri, headers);
  return callback(null, request);
};

exports.handler = handler;
export default handler;
