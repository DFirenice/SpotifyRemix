import { type Ticons } from "@/types/icons"
import Icon from "@/components/ui/Icon"
import Link from "next/link"

import { useActiveLink } from '@/hooks/isActiveLink'
import { cn } from "@/lib/utils"

const NavItem = ({
    link, icon,
    text, active = false,
    root = false
  }: {
    link: string | string[], icon?: Ticons,
    text: string, active?: boolean,
    root?: boolean
  }
) => {
  // Identifying link
  const linksRoot = Array.isArray(link) ? link[0] : link
  const isActiveRoot = useActiveLink(linksRoot + (root ? '*' : ''))
  return (
      <div className={
        `${active || isActiveRoot ? 'bg-dp-1' : 'transparent'}
        pl-1.5 pr-6 rounded-xl flex-1 min-w-[10dvw] hover:bg-dp-1`
      }>
          <Link
              href={Array.isArray(link) ? link.join('/') : link}
              className={cn(
                'flex flex-row items-center truncate',
                {
                    'text-fg-primary': active || isActiveRoot,
                    'text-fg-secondary': !active && !isActiveRoot
                }
              )}
          >
            {/* May have not _filled version, rework required! */}
              { icon && (
                  <Icon
                    size="large"
                    id={(`${icon}${active || isActiveRoot ? '_filled': ''}`) as Ticons}
                    color={cn({ '#E0E0E0': active || isActiveRoot })}
                  />
              )}
              <span className="truncate">
                  { text }
              </span>
          </Link>
      </div>
  )
}

export default NavItem