import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const maxRecords = parseInt(searchParams.get('maxRecords') || '10');
    const pageNumber = parseInt(searchParams.get('pageNumber') || '1');
    const offset = (pageNumber - 1) * maxRecords;

    const status = searchParams.get('status'); // optional filter
    const search = searchParams.get('search'); // search by user_name or user_email

    const startDate = searchParams.get('startDate'); // optional date filter
    const endDate = searchParams.get('endDate');

    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc'; // asc or desc

    let query = supabase
        .from('commissions')
        .select('*', { count: 'exact' })
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(offset, offset + maxRecords - 1);

    // Apply filters
    if (status) {
        query = query.eq('status', status);
    }

    if (search) {
        query = query.or(`user_name.ilike.%${search}%,user_email.ilike.%${search}%`);
    }

    if (startDate && endDate) {
        query = query.gte('created_at', startDate).lte('created_at', endDate);
    }

    const { data, error, count } = await query;

    if (error) {
        return NextResponse.json({ message: 'Failed to fetch commissions', error }, { status: 500 });
    }

    return NextResponse.json({
        data,
        totalRecords: count,
        totalPages: Math.ceil(count! / maxRecords),
        currentPage: pageNumber,
    });
}
