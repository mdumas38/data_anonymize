import { createClient } from '@supabase/supabase-js';
import { anonymizeData } from '../../utils/anonymization';
import { UserData } from './types/user'; // Add this import

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_KEY ?? ''
);

export async function insertUser(userData: UserData) {
  const anonymizedData = anonymizeData(userData);
  
  const { data, error } = await supabase
    .from('users')
    .insert(anonymizedData);
    
  if (error) throw error;
  return data;
}