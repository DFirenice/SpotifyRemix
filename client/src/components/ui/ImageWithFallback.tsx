'use client'

import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"

const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: ImageProps & { fallback: string }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <Image
      alt={alt}
      onError={() => setError}
      src={error ? fallback : src}
      {...props}
    />
  )
}

export default ImageWithFallback