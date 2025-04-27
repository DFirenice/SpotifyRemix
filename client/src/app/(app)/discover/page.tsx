import { Button } from "@/components/ui/button"

const discoverTypes: string[] = ["Music", "EDM", "Indie", "Pop", "Rock", "Alt Rock", "Country", "R&B", "Hip-Hop", "Podcast", "Audiobooks"]

const DiscorverPage = () => {
    return (
        <section className="flex h-full flex-col">
            {/* Panel */}
            <div className="
                w-full flex flex-nowrap
                overflow-hidden align-center 
                gap-x-2 py-3
            ">
                {discoverTypes.map((type, i) => (
                    <Button key={`${type}_${i}`} variant="primary">
                        {type}
                    </Button>
                ))}
            </div>
            {/* Suggestions body */}
            <div className="h-full w-full flex">
                Corresponding content of selected panel
            </div>
        </section>
    )
}

export default DiscorverPage