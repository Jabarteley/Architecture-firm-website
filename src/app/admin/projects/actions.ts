'use server';

import { revalidatePath } from 'next/cache';
import { supabaseUtils, Project } from '@/utils/supabase-utils';

export async function createOrUpdateProjectAction(projectData: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>, projectId?: string) {
  try {
    let result: Project;
    if (projectId) {
      result = await supabaseUtils.updateProject(projectId, projectData);
    } else {
      result = await supabaseUtils.createProject(projectData as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
    }

    revalidatePath('/projects'); // Revalidate the public projects page
    revalidatePath('/admin/projects'); // Revalidate the admin projects page as well

    return { success: true, project: result };
  } catch (error) {
    console.error('Error in createOrUpdateProject Server Action:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteProjectAction(projectId: string) {
    try {
        await supabaseUtils.deleteProject(projectId);
        revalidatePath('/projects'); // Revalidate the public projects page
        revalidatePath('/admin/projects'); // Revalidate the admin projects page as well
        return { success: true };
    } catch (error) {
        console.error('Error in deleteProject Server Action:', error);
        return { success: false, error: (error as Error).message };
    }
}
