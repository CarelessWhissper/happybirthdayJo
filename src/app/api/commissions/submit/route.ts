import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { user_name, user_email, description } = body;

    const { data, error } = await supabase
        .from('commissions')
        .insert([{ user_name, user_email, description, status: 'PENDING' }]);

    if (error) {
        return NextResponse.json({ message: 'Error submitting commission', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Commission submitted successfully', data }, { status: 201 });
}
