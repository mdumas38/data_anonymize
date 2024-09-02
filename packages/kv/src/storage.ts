import { anonymizeData, deanonymizeData } from '../../utils/anonymization';
import { client } from "./index";

export async function setKVData(key: string, value: any) {
  const anonymizedValue = anonymizeData(value);
  await client.set(key, JSON.stringify(anonymizedValue));
}

export async function getKVData(key: string) {
  const anonymizedValue = await client.get(key);
  if (!anonymizedValue || typeof anonymizedValue !== 'string') return null;
  
  return deanonymizeData(JSON.parse(anonymizedValue));
}