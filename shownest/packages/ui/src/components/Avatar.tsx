import * as React from 'react'

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className = '', src, alt = 'Avatar', size = 'md', fallback, ...props }, ref) => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    }
    
    const [imageError, setImageError] = React.useState(false)

    if (imageError || !src) {
      return (
        <div
          className={`
            inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium
            ${sizes[size]}
            ${className}
          `}
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`
          rounded-full object-cover
          ${sizes[size]}
          ${className}
        `}
        onError={() => setImageError(true)}
        {...props}
      />
    )
  }
)

Avatar.displayName = 'Avatar'
