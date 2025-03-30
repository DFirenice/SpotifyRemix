import { type Ticons } from "@/types/icons"
import Icon from "@/components/ui/Icon"

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
            pr-3 rounded-md flex-1 min-w-[10dvw] hover:bg-dp-1`
        }>
          <a
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
          </a>
      </div>
  )
}

export default NavItem