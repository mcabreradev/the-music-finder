import { NextRequest, NextResponse } from 'next/server';
import {Album} from '@/types';

import apiClient, {endpoints} from '@/lib/client';


export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('i');
  if (!param) {
    return NextResponse.json(
      { error: 'Search parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await apiClient.get<Album>(endpoints.artistAlbum, { params: { i: param } });

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch albums data: ' + error },
      { status: 500 }
    );
  }
}

