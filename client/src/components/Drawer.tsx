import { menuList as DMenuList } from '@/data/Drawer'
import DrawerItem from "@/components/ui/DrawerItem"

const Drawer = () => {    
    return (
        <div className="
            h-screen px-2.5 py-1.5
            flex flex-col gap-2
            w-[14dvw]
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