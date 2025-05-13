import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_SIZE } from '@/lib/config';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= MAX_ATTACHMENT_SIZE, {
      message: 'File size should be less than 5MB',
    })
    .refine((file) => ALLOWED_ATTACHMENT_TYPES.includes(file.type), {
      message: 'File type should be JPEG, PNG or WEBP',
    }),
});

export async function POST(request: Request) {
  // Todo: Add authentication

  if (request.body === null) {
    return new Response('Request body is empty', { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(', ');

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const filename = (formData.get('file') as File).name;
    const fileBuffer = await file.arrayBuffer();

    try {
      const data = await put(`/message-attachments/${filename}`, fileBuffer, {
        access: 'public',
        addRandomSuffix: true,
      });

      return NextResponse.json(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
