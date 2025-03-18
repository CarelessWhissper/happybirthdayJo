import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getCommissions() {
    const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((item) => ({
        ...item,
        key: item.id,
    }));
}

export async function updateCommissionStatus(id: number, status: string) {
    const { error } = await supabase
        .from('commissions')
        .update({ status })
        .eq('id', id);

    if (error) throw error;
}
