import { NextRequest, NextResponse } from 'next/server';
import {Artist} from '@/types';

import apiClient, {endpoints} from '@/lib/client';


export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get('i');
    try {
     const response = await apiClient.get<Artist>(endpoints.artistDetails, { params: { i: param } });

      return NextResponse.json(response)
    } catch (error) {
      return NextResponse.json(error)
    }
}

