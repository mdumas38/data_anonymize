import express, { Request, Response } from 'express';
import { anonymizeData, deanonymizeData } from '../../../../packages/data-anonymizer/src/anonymizer';
import { createClient } from '@supabase/supabase-js';

const app = express();

// Example route for user data
app.post('/api/user', async (req: Request, res: Response) => {
  const userData = req.body;
  const anonymizedData = anonymizeData(userData);
  
// Store anonymizedData in database
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const { data, error } = await supabase
  .from('users')
  .insert([
    { id: anonymizedData.id, data: anonymizedData }
  ]);
  
  if (error) {
    console.error('Error storing user data:', error);
    return res.status(500).json({ error: 'Error storing user data' });
  }
  res.status(200).json({ message: 'User data stored successfully' });
});

app.get('/api/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Fetch anonymized data from database
  const anonymizedData = await fetchUserData(userId);
  
  const deanonymizedData = deanonymizeData(anonymizedData);
  
  res.status(200).json(deanonymizedData);
});

// Add new route for anonymization
app.post('/api/anonymize', async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    const anonymizedData = anonymizeData(data);
    res.status(200).json({ anonymizedData });
  } catch (error) {
    console.error('Anonymization error:', error);
    res.status(500).json({ error: 'Anonymization failed' });
  }
});

export async function fetchUserData(userId: string) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export { app };