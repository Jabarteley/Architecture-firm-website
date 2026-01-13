import { createClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect_to') || '/';

  const supabase = createClient();

  await supabase.auth.signOut();

  // Clear cookies
  const cookieStore = cookies();
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  redirect(redirectTo);
}