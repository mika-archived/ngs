import { parse } from "querystring";
import { extname } from "path";
import { URL } from "url";

import { SUPPORTED_INPUT_FORMATS } from "./const";
import { Parameters } from "./types";
import { cast } from "./validator";
import sanitize from "./sanitizer";

const IMAGEFLUX_PARAMETER_FORMAT = /\/c\/(.+?)\//;

type KeyValuePair = {
  [key: string]: string;
};

export function isCompatibleWithImageFlux(str: string): boolean {
  return IMAGEFLUX_PARAMETER_FORMAT.test(str);
}

export function isSupportWebP(headers: KeyValuePair): boolean {
  return headers.accept.includes("image/webp");
}

export function isSupportInputFormats(str: string): boolean {
  return SUPPORTED_INPUT_FORMATS.includes(extname(str.toLowerCase()).substring(1));
}

export async function rewrite(url: string, headers: KeyValuePair): Promise<string> {
  const webp = isSupportWebP(headers);

  let path!: string;
  let parameters!: Parameters;
  if (isCompatibleWithImageFlux(url)) {
    // validate and sort
    const matches = url.match(IMAGEFLUX_PARAMETER_FORMAT)!;
    path = url.replace(matches[0], "/");
    parameters = await cast(parse(matches[1], ","));
  } else {
    // parse, validate and sort
    const { pathname, search } = new URL(`https://example.com${url}`); // trust
    path = pathname!;
    parameters = await cast(parse(search.substring(1)));

    if (!search) {
      return webp && isSupportInputFormats(path) ? `/c/f=webp/${path.substring(1)}` : url;
    }
  }

  if (!isSupportInputFormats(path)) {
    return path; // does not rewrite
  }

  if (parameters.f === "auto") {
    const extension = extname(path).substring(1);
    parameters.f = webp ? "webp" : extension;
  }

  const query = Object.keys(sanitize(parameters))
    .sort()
    .map(w => `${w}=${(parameters as any)[w]}`)
    .join(",");
  return `/c/${query}/${path.substring(1)}`;
}
