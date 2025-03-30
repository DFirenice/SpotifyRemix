import NavItem from "@/components/ui/NavItem"
import Search from '@/components/ui/Search'

const Navigation = ({ ...props }) => {
    return (
        <header { ...props }>
            <div className="grid grid-cols-[minmax(250px,auto)_auto_auto_auto_1fr] gap-1.5">
                <NavItem link="/library" text="My Library" icon="library" root />
                <NavItem link="/" text="Home" icon="home" root />
                <NavItem link="/discover" text="Discover" icon="discover" root />
                <Search />
                {/* Cfg features */}
            </div>
        </header>
    )
}

export default Navigation