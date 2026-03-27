import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const sectionId = formData.get('sectionId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!sectionId) {
      return NextResponse.json(
        { error: 'sectionId is required' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image (JPEG, PNG, WebP, or GIF)' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create safe filename
    const safeName = sectionId.replace(/[^a-zA-Z0-9-]/g, '_')
    // Get original extension, fallback to .png if missing
    const ext = path.extname(file.name).toLowerCase() || '.png'
    const filename = `telecaller_${safeName}${ext}`
    const publicDir = path.join(process.cwd(), 'public', 'presentation-images')

    // Ensure directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    const filepath = path.join(publicDir, filename)
    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      imageUrl: `/presentation-images/${filename}`,
      filename: filename,
      originalName: file.name,
      fileSize: file.size,
      fileType: file.type
    })

  } catch (error: any) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to upload image'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check if uploaded images exist
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sectionId = searchParams.get('sectionId')

  if (!sectionId) {
    return NextResponse.json(
      { error: 'sectionId is required' },
      { status: 400 }
    )
  }

  const safeName = sectionId.replace(/[^a-zA-Z0-9-]/g, '_')
  const baseFilename = `telecaller_${safeName}`
  const dirPath = path.join(process.cwd(), 'public', 'presentation-images')

  // Array of allowed extensions to check against
  const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif']

  // Loop through extensions to see if any file matches
  for (const ext of extensions) {
    const filename = `${baseFilename}${ext}`
    const filepath = path.join(dirPath, filename)

    if (fs.existsSync(filepath)) {
      return NextResponse.json({
        exists: true,
        imageUrl: `/presentation-images/${filename}`
      })
    }
  }

  // If loop finishes and no file is found
  return NextResponse.json({
    exists: false
  })
}
