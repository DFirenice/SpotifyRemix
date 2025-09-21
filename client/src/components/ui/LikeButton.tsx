import { useLikedSongsStore } from "@/stores/LikedSongsStore";
import type { TFavoriteEntityType } from "@/stores/LikedSongsStore";
import IconButton from "./IconButton";
import { cn } from "@/lib/utils";

export const LikeButton = ({ entityId, type } : { entityId: string | null | undefined, type: TFavoriteEntityType }) => {
    const toggleFavorite = useLikedSongsStore(state => state.toggleFavorite)
    const isLiked = useLikedSongsStore(state => state.isLiked)
    
    const handleMarkFavorite = async () => {
        if (typeof entityId === 'string')
            await toggleFavorite(entityId, type)
    }

    return (
        <IconButton
            icon="like"
            onClick={handleMarkFavorite}
            className={
                cn({
                    "**:fill-secondary **:stroke-secondary":
                        typeof entityId === 'string' && isLiked(entityId, type)
                })
            }
        />
    )
}