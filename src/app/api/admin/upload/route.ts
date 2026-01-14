import { NextRequest } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Extract the authorization header to verify the session
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ message: 'Missing or invalid authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Create a Supabase client with anon key for this request
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Verify the session using the token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is admin by querying the users table
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (roleError || !userData || userData.role !== 'admin') {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

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