import { config } from 'dotenv';
import path from "path";
import _ from "lodash";

if (process.env.NODE_ENV === 'test') {
  config({ path: path.resolve(process.cwd(), '.env.test'), override: true });
} else {
  config({ path: path.resolve(process.cwd(), '.env'), override: true });
}

const bool = (value: string): boolean => {
  return value?.toLowerCase() === 'true' || value === '1';
}
const number = (value: string, defaultValue: number|undefined): number => {
  const ret = Number(value)
  if (_.isNaN(ret)) { return defaultValue }
  return ret
}

export const ROOT_PATH = path.resolve(process.cwd());

const Config: any = _.assign({}, process.env);
Config.NODE_ENV ||= 'production'
Config.WECHAT_CHECK_SIGNATURE = bool(Config.WECHAT_CHECK_SIGNATURE)
Config.MOCK_API = bool(Config.MOCK_API)


export default Config;
