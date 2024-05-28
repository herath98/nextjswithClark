import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Error: No signed in user' },
      { status: 401 },
    );
  }

  // Add your Route Handler logic here

  return NextResponse.json({ userId });
}