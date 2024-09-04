import { NextResponse } from 'next/server';
import { POST as anonymizeHandler } from '../../../../../../packages/data-anonymizer/api/anonymize'

export async function POST(request: Request) {
  return anonymizeHandler(request);
}
