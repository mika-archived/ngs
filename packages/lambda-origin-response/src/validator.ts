import * as yup from "yup";

const SUPPORTED_FORMATS = ["jpg", "jpeg", "png", "gif", "tiff"];

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
    return SUPPORTED_FORMATS.includes(array[0]);
  }
  return array.every(w => SUPPORTED_FORMATS.includes(w));
}

// prettier-ignore
const schema = yup.object().shape({
  // aspect ratio, nullable, 0 - 3, default 1
  a: yup.number().min(0).max(3).notRequired(),
  // background color, nullable, ffffff or ffffffff (with alpha), default: ffffff
  b: yup.string().matches(REGEXPS.COLOR_FORMAT).default("ffffff"),
  // blur, nullable: int"x"float
  // TODO: NOT SUPPORTED IN CURRENT VERSION
  // clip, nullable, int:int:int:int
  c: yup.string().matches(REGEXPS.CLIP_INTEGER_FORMAT).notRequired(),
  // clip ratio, nullable, float:float:float:float (0-1), default: 0:0:1:1
  cr: yup.string().matches(REGEXPS.CLIP_FLOAT_FORMAT).default("0:0:1:1"),
  // format, nullable, one of enums
  f: yup.string().oneOf(["webp", "auto"].concat(SUPPORTED_FORMATS)).default("auto"),
  // origin, nullable, 1 - 0, default 4
  g: yup.number().min(1).max(9).default(4),
  // height, nullable, 1 -
  h: yup.number().min(1).notRequired(),
  // optimize flag, nullable, default: true
  o: yup.boolean().default(true),
  // rotate, nullable, 1 - 8 or "auto", default: 1
  r: yup.string().matches(REGEXPS.ROTATE_FORMAT).default("1"),
  // through, nullable, xxx or xxx:xxx...
  through: yup.string().test("format", "invalid format", (str) =>  !str || isValidThroughFormat(str)).notRequired(),
  // upscale, nullable, default: 1
  u: yup.boolean().default(true),
  // unsharp, nullable, int"x"float+float+float
  // TODO: NOT SUPPORTED IN CURRENT VERSION
  // version, nullable
  v: yup.string().notRequired(),
  // width: nullable, 1 -
  w: yup.number().min(1).notRequired()
});

export async function validate(obj: object): Promise<boolean> {
  try {
    await schema.validate(obj);
    return true;
  } catch (e) {
    return false;
  }
}

export async function cast(obj: object): Promise<{}> {
  const value = await schema.cast(obj);
  return value;
}
