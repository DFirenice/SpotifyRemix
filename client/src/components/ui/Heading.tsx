import type { HeadingProps } from "@app-types/Heading"

export default function Heading (
    { children, size = 'default',
      level = 2, ...props }: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>
) {
    const Tag = `h${level}` as React.ElementType
    return <Tag data-font-size={size} className="heading" { ...props }>
        {children}
    </Tag>
}