import { menuList as DMenuList } from '@/data/Drawer'
import DrawerItem from "@/components/ui/DrawerItem"

const Drawer = () => {    
    return (
        <div className="
            h-screen px-2.5 py-1.5
            flex flex-col gap-2
            w-full w-max-[clamp(15.625rem, 13.216rem + 12.05vw, 22.25rem)]
        ">
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