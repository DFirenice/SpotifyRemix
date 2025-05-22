import { menuList as DMenuList } from '@/data/Drawer'
import DrawerItem from "@/components/ui/DrawerItem"
import NavItem from '@/components/ui/NavItem'
import { cn } from '@/lib/utils'

const Drawer = ({ ...props }) => {    
    return (
        <div
            className={cn(
                "h-full px-1.5 py-1.5", "bg-dp-1 rounded-xl",
                props?.className
            )}
        >
            <div className="mb-1.5">
                <NavItem link="/library" text="My Library" icon="library" root />
            </div>
            { DMenuList.map(({ text, iconId }, i) => {
                return (
                    <DrawerItem
                        key={`${i}_${text}`}
                        content={text}
                        icon={iconId}
                    />
                )
            }) }
        </div>
    )
}

export default Drawer