import { type Ticons } from "@/types/icons"
import Icon from "@/components/ui/Icon"
import Link from "next/link"

import classNames from 'classnames'
import { useActiveLink } from '@/hooks/isActiveLink'

const NavItem = ({
    link, icon,
    text, active = false,
    root = false
  }: {
    link: string, icon?: Ticons,
    text: string, active?: boolean,
    root?: boolean,
    classes?: string | React.CSSProperties
  }
) => {
  // Identifying link
  const isActiveRoot = useActiveLink(link + (root ? '*' : ''))
  return (
      <div className={
            `${active || isActiveRoot ? 'bg-dp-1' : 'bg-dp-0'}
            pl-1.5 pr-6 rounded-xl flex-1 min-w-[10dvw] hover:bg-dp-1`
        }>
          <Link
              href={link}
              className={classNames(
                'flex flex-row items-center truncate',
                {
                    'text-fg-primary': active || isActiveRoot,
                    'text-fg-secondary': !active && !isActiveRoot
                }
              )}
          >
            {/* May have not _filled version, rework required! */}
              { icon && <Icon size="large" id={(`${icon}${active || isActiveRoot ? '_filled': ''}`) as Ticons} /> }
              <span className="truncate">
                  { text }
              </span>
          </Link>
      </div>
  )
}

export default NavItem