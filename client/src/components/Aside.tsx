import { useAsideStore } from "@/stores/useAside"

const Aside = () => {
    const openAside = useAsideStore((state) => state.openAside);

    return openAside && (
        <div className="bordered p-3.5 max-w-[20dvw]">
            {openAside}
        </div>
    )
}

export default Aside