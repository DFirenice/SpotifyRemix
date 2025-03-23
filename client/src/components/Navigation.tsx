import DrawerItem from "@/components/ui/DrawerItem"

const Navigation = ({ ...props }) => {
    return (
        <header
            className="w-dvw h-fit"
            { ...props }
        >
            <DrawerItem
                content={<span className="text-fg-secondary">My Library</span>}
                icon="library"
            />
        </header>
    )
}

export default Navigation