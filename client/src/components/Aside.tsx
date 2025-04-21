import { useAsideStore } from "@/stores/useAside"

const Aside = () => {
    const openAside = useAsideStore((state) => state.openAside);

    return openAside && (
        <div className="border-2 border-dp-1 p-3.5 max-w-[20dvw]">
            {openAside}
        </div>
    )
}

export default Aside