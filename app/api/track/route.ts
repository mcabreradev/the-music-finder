import { NextRequest, NextResponse } from 'next/server';
import {Track} from '@/types';
import apiClient, { endpoints } from '@/lib/client';

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('h');

  if (!param) {
    return NextResponse.json(
      { error: 'Search parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await apiClient.get<Track>(endpoints.artistTrack, { params: { h: param } });

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch track data: '+ error },
      { status: 500 }
    );
  }
}

