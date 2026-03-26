import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { writeFile } from 'fs/promises'

// Supported image sizes
const SUPPORTED_SIZES = [
  '1024x1024',
  '768x1344',
  '864x1152',
  '1344x768',
  '1152x864',
  '1440x720',
  '720x1440'
]

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = '1344x768', sectionId } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_SIZES.includes(size)) {
      return NextResponse.json(
        { error: `Unsupported size: ${size}. Use one of: ${SUPPORTED_SIZES.join(', ')}` },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const response = await zai.images.generations.create({
      prompt: prompt,
      size: size
    })

    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('Invalid response from image generation API')
    }

    const imageBase64 = response.data[0].base64
    const buffer = Buffer.from(imageBase64, 'base64')

    // Create a safe filename from sectionId or generate a hash
    const safeName = sectionId 
      ? sectionId.replace(/[^a-zA-Z0-9-]/g, '_')
      : crypto.createHash('md5').update(prompt + Date.now()).digest('hex')
    
    const filename = `telecaller_${safeName}.png`
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
      prompt: prompt,
      size: size,
      fileSize: buffer.length
    })

  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to generate image'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check if images exist
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
  const filename = `telecaller_${safeName}.png`
  const filepath = path.join(process.cwd(), 'public', 'presentation-images', filename)

  if (fs.existsSync(filepath)) {
    return NextResponse.json({
      exists: true,
      imageUrl: `/presentation-images/${filename}`
    })
  }

  return NextResponse.json({
    exists: false
  })
}
