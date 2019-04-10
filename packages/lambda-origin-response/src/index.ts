// eslint-disable-next-line no-unused-vars,import/no-unresolved
import { CloudFrontResponseEvent, CloudFrontResponseCallback, Context } from "aws-lambda";

exports.handler = (_event: CloudFrontResponseEvent, _context: Context, callback: CloudFrontResponseCallback) => {
  callback();
};
