// Ｎｏｔｅ：　Required optimization to clean the oldest cache on reaching certain limit (ex.g. 30 songs)

import { useProtectedApi } from "@/lib/axios";
import { TPlaylist, TSong } from "@/types/mediaEntities.types.ts";
import { create } from "zustand";

type TCacheUrls = {
    cache: {
        coverUrl: string
        songUrl: string
    } | undefined
}

type TCachedCover = {
    cached_cover: string
}

// type TSongId = Pick<TSong, "id">

export type TSongWithCache = TSong & TCacheUrls
export type TPlaylistWithCache = TPlaylist & TCachedCover

interface ICachedSongsStore {
    cache: TSongWithCache[]
    cachedPlaylists: TPlaylistWithCache[]
    /** Caches and returns playlist with cached cover (TPlaylistWithCache)
     * @param playlist raw entity */
    cachePlaylist: (playlist: TPlaylist) => Promise<TPlaylistWithCache>
    /** Caches and returns cached song
     * @param song raw entity */
    addToCache: (song: TSong) => Promise<TSongWithCache>
    /** Returns cached song or undefined
     * @param songId */
    getFromCache: (id: string) => Promise<TSongWithCache | undefined>
}

/** Utility for parsing cover only
 * @argument `cover_path` as string
 * @returns `coverUrl` as Promise<string>
*/
const parseCover = async (cover_path: string): Promise<string | undefined> => {
    try {
        const { data } = await useProtectedApi.post('/get-media/cover', { path: cover_path })
        const coverBlob = await fetch(data.coverUrl.signedUrl).then(res => res.blob())
        if (data) return URL.createObjectURL(coverBlob)
    } catch (err) { console.error(err) }
}

/** Utility that helps to generate blobs for caching */
const makeCache = async (
    { cover_path, file_path }:
    { cover_path: string, file_path: string }
) => {
    try {
        const { data } = await useProtectedApi.post('/get-media/full-song', { cover_path, file_path })

        const coverBlob = await fetch(data.coverUrl.signedUrl).then(res => res.blob())
        const coverUrl = URL.createObjectURL(coverBlob)

        const songBlob = await fetch(data.songUrl.signedUrl).then(res => res.blob())
        const songUrl = URL.createObjectURL(songBlob)

        if (data) return { coverUrl, songUrl }
    } catch (err) { console.error(err) }
}

const useCachedSongsStore = create<ICachedSongsStore>((set, get) => ({
    cache: [],
    cachedPlaylists: [],

    cachePlaylist: async (playlist: TPlaylist): Promise<TPlaylistWithCache> => {
        const cache = get().cachedPlaylists
        const hasCached = cache.find(p => p.id === playlist.id)
        if (hasCached) return hasCached // Playlist entity (object)

        // Adding to cache
        const cached_cover = playlist.cover_path ? await parseCover(playlist.cover_path) as string : '/'
        const playlistWithCache: TPlaylistWithCache = { ...playlist, cached_cover }
        set(state => ({ cachedPlaylists: [ ...state.cachedPlaylists, playlistWithCache ] }))
        return playlistWithCache
    },

    addToCache: async (song: TSong): Promise<TSongWithCache> => {
        const cache = get().cache
        const hasCached = cache.find(s => s.id === song.id)
        if (hasCached) return hasCached // Song entity (object)

        // Adding to cache
        const cachedUrls = await makeCache({ cover_path: song.cover_path as string, file_path: song.file_path })
        const songWithCache: TSongWithCache = { ...song, cache: cachedUrls }
        set(state => ({ cache: [ ...state.cache, songWithCache ] }))
        return songWithCache
    },

    getFromCache: async (id: string) => {
        const song = get().cache.find(song => song.id === id) as TSongWithCache | undefined
        if (!song) return undefined

        if (!song.cache) {
            const cachedUrls = await makeCache({ cover_path: song.cover_path as string, file_path: song.file_path })
            const songWithCache: TSongWithCache = { ...song, cache: cachedUrls }
              // Updating the cache property for the song
            set(state => ({
                cache: state.cache.map(s =>
                    s.id === id ? songWithCache : s
                )
            }))
            return songWithCache
        }

        return song
    }
}))

export default useCachedSongsStore