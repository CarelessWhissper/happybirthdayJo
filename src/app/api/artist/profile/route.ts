import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const { data, error } = await supabase.from('artist_info').select('*').single();

    if (error) {
        return NextResponse.json({ message: 'Error fetching artist profile', error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
}
