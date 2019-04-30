import * as yup from "yup";
import * as Constants from "./const";
import { Parameters } from "./types";

const REGEXPS = {
  // color format
  COLOR_FORMAT: /^([0-9a-f]{6}|[0-9a-f]{8})$/i,
  // clipping format (int)
  CLIP_INTEGER_FORMAT: /^([1-9][0-9]*:){3}([1-9][0-9]*)$/,
  // clipping format (float)
  CLIP_FLOAT_FORMAT: /^((0(\.\d+)?|1(\.0+)?):){3}(0(\.\d+)?|1(\.0+)?)$/,
  // rotate format
  ROTATE_FORMAT: /^([1-8]|auto)$/
};

function isValidThroughFormat(str: string): boolean {
  const array = str.split(":");
  if (array.length === 1) {
    return Constants.SUPPORTED_THROUGH_FORMATS.includes(array[0]);
  }
  return array.every(w => Constants.SUPPORTED_THROUGH_FORMATS.includes(w));
}

// prettier-ignore
const schema = yup.object().shape({
  // aspect ratio, nullable, 0 - 3, default 1
  a: yup.number().min(0).max(3).notRequired(),
  // background color, nullable, ffffff or ffffffff (with alpha), default: ffffff
  b: yup.string().matches(REGEXPS.COLOR_FORMAT).default(Constants.DEFAULT_BACKGROUND_COLOR),
  // blur, nullable: int"x"float
  // TODO: NOT SUPPORTED IN CURRENT VERSION
  // clip, nullable, int:int:int:int
  c: yup.string().matches(REGEXPS.CLIP_INTEGER_FORMAT).notRequired(),
  // clip ratio, nullable, float:float:float:float (0-1), default: 0:0:1:1
  cr: yup.string().matches(REGEXPS.CLIP_FLOAT_FORMAT).default(Constants.DEFAULT_CLIP_FLOAT_VALUE),
  // format, nullable, one of enums
  f: yup.string().oneOf(["auto"].concat(Constants.SUPPORTED_OUTPUT_FORMATS)).default(Constants.DEFAULT_FORMAT_VALUE),
  // origin, nullable, 1 - 9, default 4
  g: yup.number().min(1).max(9).default(Constants.DEFAULT_ORIGIN_VALUE),
  // height, nullable, 1 -
  h: yup.number().min(1).notRequired(),
  // optimize flag, nullable, default: true
  o: yup.boolean().default(Constants.DEFAULT_OPTIMIZED_FLAG),
  // quality, nullable, 1 - 100, default: 75
  q: yup.number().min(1).max(100).default(Constants.DEFAULT_QUALITY_VALUE),
  // rotate, nullable, 1 - 8 or "auto", default: 1
  r: yup.string().matches(REGEXPS.ROTATE_FORMAT).default(Constants.DEFAULT_ROTATE_VALUE),
  // through, nullable, xxx or xxx:xxx...
  through: yup.string().test("format", "invalid format", (str) =>  !str || isValidThroughFormat(str)).notRequired(),
  // upscale, nullable, default: 1
  u: yup.boolean().default(Constants.DEFAULT_UPSCALE_VALUE),
  // unsharp, nullable, int"x"float+float+float
  // TODO: NOT SUPPORTED IN CURRENT VERSION
  // version, nullable
  v: yup.string().notRequired(),
  // width: nullable, 1 -
  w: yup.number().min(1).notRequired()
});

export async function validate(obj: object): Promise<yup.Shape<{}, Parameters>> {
  const awaiter = await schema.validate(obj);
  return awaiter;
}

export async function cast(obj: object): Promise<Parameters> {
  const value = await schema.cast(obj);
  return value;
}
