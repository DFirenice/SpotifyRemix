import { useAsideStore } from "@/stores/useAside"

const Aside = () => {
    const openAside = useAsideStore((state) => state.openAside);

    return openAside && (
        <div className="border-2 border-dp-1">
            {openAside}
        </div>
    )
}

export default Aside