import * as crypto from 'crypto';

function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function anonymizeData(data: any): any {
  console.log('Input data:', data);

  if (typeof data === 'string') {
    // If it's a string, just return a hashed version
    return hashData(data).slice(0, 10);
  }

  if (typeof data !== 'object' || data === null) {
    console.log('Data is not an object or is null, returning as is:', data);
    return data;
  }

  const result: any = {};

  for (const [key, value] of Object.entries(data)) {
    console.log(`Processing key: ${key}, value:`, value);

    if (key === 'email' && typeof value === 'string') {
      const [username = '', domain = ''] = (value as string).split('@');
      result[key] = `${hashData(username).slice(0, 8)}@${domain || 'example.com'}`;
      console.log(`Anonymized email: ${result[key]}`);
    } else if (key === 'name' && typeof value === 'string') {
      result[key] = hashData(value).slice(0, 10);
      console.log(`Anonymized name: ${result[key]}`);
    } else if (typeof value === 'object') {
      console.log(`Recursively anonymizing object for key: ${key}`);
      result[key] = anonymizeData(value);
    } else {
      result[key] = value;
      console.log(`Keeping original value for key: ${key}`);
    }
  }

  console.log('Anonymized result:', result);
  return result;
}

export function deanonymizeData(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const result: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === 'email' && typeof value === 'string') {
      // In a real implementation, you would look up the original email
      // from a secure database using the hashed username
      result[key] = `${value.split('@')[0]}@example.com`;
    } else if (key === 'name' && typeof value === 'string') {
      // Similarly, you would look up the original name
      // from a secure database using the hash
      result[key] = `User-${value}`;
    } else if (typeof value === 'object') {
      result[key] = deanonymizeData(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
