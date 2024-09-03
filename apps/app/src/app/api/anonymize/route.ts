import { NextResponse } from 'next/server';
import { anonymizeData } from '../../../../../../packages/utils/anonymization'; // You'll need to create this utility function

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Received data:', body);

  if (!body || typeof body !== 'object' || !body.data) {
    return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
  }

  try {
    const anonymizedData = anonymizeData(body.data);
    return NextResponse.json({ anonymizedData });
  } catch (error) {
    console.error('Anonymization error:', error);
    return NextResponse.json({ error: 'Anonymization failed' }, { status: 500 });
  }
}
