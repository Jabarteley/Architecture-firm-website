'use server';

import { revalidatePath } from 'next/cache';
import { supabaseUtils, BlogPost } from '@/utils/supabase-utils';

export async function createOrUpdateBlogPostAction(postData: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>, postId?: string) {
  try {
    let result: BlogPost;
    if (postId) {
      result = await supabaseUtils.updateBlogPost(postId, postData);
    } else {
      result = await supabaseUtils.createBlogPost(postData as Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>);
    }

    revalidatePath('/blog'); // Revalidate the public blog page
    revalidatePath('/admin/blog'); // Revalidate the admin blog page as well, in case it's cached
    revalidatePath('/'); // Revalidate the homepage to update any blog references

    return { success: true, post: result };
  } catch (error) {
    console.error('Error in createOrUpdateBlogPost Server Action:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBlogPostAction(postId: string) {
    try {
        await supabaseUtils.deleteBlogPost(postId);
        revalidatePath('/blog'); // Revalidate the public blog page
        revalidatePath('/admin/blog'); // Revalidate the admin blog page as well
        revalidatePath('/'); // Revalidate the homepage to update any blog references
        return { success: true };
    } catch (error) {
        console.error('Error in deleteBlogPost Server Action:', error);
        return { success: false, error: (error as Error).message };
    }
}
