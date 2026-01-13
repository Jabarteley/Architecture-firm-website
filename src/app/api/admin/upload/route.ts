import { NextRequest } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // In a real app, you would check the user's role in the database
    // For now, we'll assume any authenticated user is an admin
    // You would typically do something like:
    // const { data: userData, error } = await supabase
    //   .from('users')
    //   .select('role')
    //   .eq('id', user.id)
    //   .single();
    //
    // if (error || userData?.role !== 'admin') {
    //   return new Response(
    //     JSON.stringify({ message: 'Unauthorized' }),
    //     { status: 401, headers: { 'Content-Type': 'application/json' } }
    //   );
    // }

    const { file, folder, recordType, recordId } = await req.json();

    if (!file) {
      return new Response(
        JSON.stringify({ message: 'No file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadImage(file, folder);

    // Optionally, save the image reference to Supabase
    // This would depend on the recordType and recordId
    if (recordType && recordId) {
      let updateData = {};

      switch (recordType) {
        case 'project':
          // For projects, we need to get the existing images and add the new one
          const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select('images')
            .eq('id', recordId)
            .single();

          if (!projectError && projectData) {
            const newImages = [...(projectData.images || []), uploadResult.secure_url];
            updateData = { images: newImages };
            await supabase.from('projects').update(updateData).eq('id', recordId);
          }
          break;
        case 'team':
          updateData = { image_url: uploadResult.secure_url };
          await supabase.from('team_members').update(updateData).eq('id', recordId);
          break;
        case 'service':
          updateData = { image_url: uploadResult.secure_url };
          await supabase.from('services').update(updateData).eq('id', recordId);
          break;
        case 'gallery':
          updateData = { image_url: uploadResult.secure_url };
          await supabase.from('gallery_items').update(updateData).eq('id', recordId);
          break;
        case 'blog':
          updateData = { featured_image: uploadResult.secure_url };
          await supabase.from('blog_posts').update(updateData).eq('id', recordId);
          break;
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Image uploaded successfully',
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response(
      JSON.stringify({ message: 'Error uploading image', error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}