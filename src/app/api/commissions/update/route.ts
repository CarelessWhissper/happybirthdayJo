import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { id, status } = body;

    const { data, error } = await supabase
        .from('commissions')
        .update({ status })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ message: 'Error updating commission', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Commission updated successfully', data }, { status: 200 });
}
