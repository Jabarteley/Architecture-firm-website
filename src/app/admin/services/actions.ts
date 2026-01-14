'use server';

import { revalidatePath } from 'next/cache';
import { supabaseUtils, Service } from '@/utils/supabase-utils';

export async function createOrUpdateServiceAction(serviceData: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>, serviceId?: string) {
  try {
    let result: Service;
    if (serviceId) {
      result = await supabaseUtils.updateService(serviceId, serviceData);
    } else {
      result = await supabaseUtils.createService(serviceData as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
    }

    revalidatePath('/services'); // Revalidate the public services list page
    revalidatePath(`/services/${result.id}`); // Revalidate the specific public service page
    revalidatePath('/admin/services'); // Revalidate the admin services page as well

    return { success: true, service: result };
  } catch (error) {
    console.error('Error in createOrUpdateService Server Action:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteServiceAction(serviceId: string) {
    try {
        await supabaseUtils.deleteService(serviceId);
        revalidatePath('/services'); // Revalidate the public services list page
        revalidatePath(`/services/${serviceId}`); // Revalidate the specific public service page that was deleted
        revalidatePath('/admin/services'); // Revalidate the admin services page as well
        return { success: true };
    } catch (error) {
        console.error('Error in deleteService Server Action:', error);
        return { success: false, error: (error as Error).message };
    }
}
