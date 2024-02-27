import { ForgetConfigVariableError } from '~common/errors/system/forget-config-env-var.error';

interface GetEnvOptions<T> {
  default?: T;
  ignoreOnTest?: boolean;
}

export function getEnv(
  name: string,
  options: GetEnvOptions<string> = {}
): string {
  const value = process.env[name];

  if (value === undefined) {
    if (options.default === undefined) {
      if (!options.ignoreOnTest) throw new ForgetConfigVariableError(name);
    } else return options.default;
  }

  return value;
}

export function getEnvBoolean(
  name: string,
  options: GetEnvOptions<boolean> = {}
): boolean {
  const strValue = getEnv(name, { default: options.default?.toString() });

  return strValue.toLowerCase() === 'true';
}

export function getEnvNumber(
  name: string,
  options: GetEnvOptions<number> = {}
): number {
  const strValue = getEnv(name, { default: options.default?.toString() });
  return parseInt(strValue, 10);
}
