export function getEnvFilePath() {
  const env = process.env.NODE_ENV;
  const envExtension = '.env';
  if (!env) return envExtension;
  else return `${envExtension}.${env}`;
}
