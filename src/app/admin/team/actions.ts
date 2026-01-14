'use server';

import { revalidatePath } from 'next/cache';
import { supabaseUtils, TeamMember } from '@/utils/supabase-utils';

export async function createOrUpdateTeamMemberAction(memberData: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>, memberId?: string) {
  try {
    let result: TeamMember;
    if (memberId) {
      result = await supabaseUtils.updateTeamMember(memberId, memberData);
    } else {
      result = await supabaseUtils.createTeamMember(memberData as Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>);
    }

    revalidatePath('/about'); // Revalidate the public about page (where team members are shown)
    revalidatePath('/admin/team'); // Revalidate the admin team page as well

    return { success: true, member: result };
  } catch (error) {
    console.error('Error in createOrUpdateTeamMember Server Action:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTeamMemberAction(memberId: string) {
    try {
        await supabaseUtils.deleteTeamMember(memberId);
        revalidatePath('/about'); // Revalidate the public about page
        revalidatePath('/admin/team'); // Revalidate the admin team page as well
        return { success: true };
    } catch (error) {
        console.error('Error in deleteTeamMember Server Action:', error);
        return { success: false, error: (error as Error).message };
    }
}
