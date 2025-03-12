import { NextRequest, NextResponse } from 'next/server';
import {Artist} from '@/types';
import apiClient, {endpoints} from '@/lib/client';

export async function GET(request: NextRequest) {
  const artist = request.nextUrl.searchParams.get('s');

  if (!artist) {
    return NextResponse.json(
      { error: 'Search parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await apiClient.get<Artist>(endpoints.searchArtist, {
      params: { s: artist }
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search data: '+ error },
      { status: 500 }
    );
  }
}

