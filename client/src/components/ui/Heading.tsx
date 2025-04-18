import type { HeadingProps } from "@app-types/Heading"

export default function Heading (
    { children, size = 'default',
      level = 2 }: HeadingProps
) {
    const Tag = `h${level}` as React.ElementType
    return <Tag data-font-size={size} className="heading">
        {children}
    </Tag>
}