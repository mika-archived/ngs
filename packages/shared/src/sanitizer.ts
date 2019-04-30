import * as Constants from "./const";
import { Parameters } from "./types";

const DEFAULT_VALUES: any = {
  b: Constants.DEFAULT_BACKGROUND_COLOR,
  cr: Constants.DEFAULT_CLIP_FLOAT_VALUE,
  f: Constants.DEFAULT_FORMAT_VALUE,
  g: Constants.DEFAULT_ORIGIN_VALUE,
  o: Constants.DEFAULT_OPTIMIZED_FLAG,
  q: Constants.DEFAULT_QUALITY_VALUE,
  r: Constants.DEFAULT_ROTATE_VALUE,
  u: Constants.DEFAULT_UPSCALE_VALUE
};

// sanitize URLs to enable caching.
export default function sanitize(params: Parameters): Parameters {
  const parameters = params as any;
  Object.keys(DEFAULT_VALUES).forEach(w => {
    if (parameters[w] === DEFAULT_VALUES[w]) {
      delete parameters[w];
    }
  });

  return parameters;
}
