import { NextRequest, NextResponse } from 'next/server';
import {Track} from '@/types';

import apiClient, {endpoints} from '@/lib/client';


export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('m');
    try {
     const response = await apiClient.get<Track>(endpoints.artistTrack, { params: { m: param } });

      return NextResponse.json(response)
    } catch (error) {
      return NextResponse.json(error)
    }
}

