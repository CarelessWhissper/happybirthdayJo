import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Fetch account by email
        const { data, error } = await supabase
            .from('accounts')
            .select('id, email, password, role')
            .eq('email', email)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Check password
        const isValid = await bcrypt.compare(password, data.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create JWT
        const token = jwt.sign(
            { id: data.id, email: data.email, role: data.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ token });
    } catch (err) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
