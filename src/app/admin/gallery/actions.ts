'use server';

import { revalidatePath } from 'next/cache';
import { supabaseUtils, GalleryItem } from '@/utils/supabase-utils';

export async function createOrUpdateGalleryItemAction(itemData: Partial<Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>>, itemId?: string) {
  try {
    let result: GalleryItem;
    if (itemId) {
      result = await supabaseUtils.updateGalleryItem(itemId, itemData);
    } else {
      result = await supabaseUtils.createGalleryItem(itemData as Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>);
    }

    revalidatePath('/gallery'); // Revalidate the public gallery page
    revalidatePath('/admin/gallery'); // Revalidate the admin gallery page as well

    return { success: true, item: result };
  } catch (error) {
    console.error('Error in createOrUpdateGalleryItem Server Action:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteGalleryItemAction(itemId: string) {
    try {
        await supabaseUtils.deleteGalleryItem(itemId);
        revalidatePath('/gallery'); // Revalidate the public gallery page
        revalidatePath('/admin/gallery'); // Revalidate the admin gallery page as well
        return { success: true };
    } catch (error) {
        console.error('Error in deleteGalleryItem Server Action:', error);
        return { success: false, error: (error as Error).message };
    }
}
