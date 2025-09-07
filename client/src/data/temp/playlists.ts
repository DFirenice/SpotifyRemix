import type { TPlaylist } from "@/types/mediaEntities.types.ts"

const mockPlaylists: TPlaylist[] = [
    {
        id: 'playlist-001',
        name: 'Night Chillwave',
        tags: ['chill', 'night', 'synthwave'],
        previewURL: 'https://i.pinimg.com/736x/5b/f0/78/5bf0780314175503b9b4a1c7a350cc34.jpg',
        size: 3,
        songs: [
            {
                id: 'song-003',
                name: 'Neon Dreams',
                tags: ['retro', 'dreamy'],
                author: {
                    _id: 'user-123e4567-e89b-12d3-a456-426614174002',
                    username: 'Dream Architect'
                },
                belongsRef: 'playlist-001',
                previewURL: 'https://i.pinimg.com/736x/5b/f0/78/5bf0780314175503b9b4a1c7a350cc34.jpg',
                sourceURL: 'https://example.com/audio/neon-dreams.mp3',
                uploadedAt: '2025-06-14T22:02:00.000Z',
                updatedAt: '2025-06-14T22:02:00.000Z',
                duration: 201
            },
            {
                id: 'song-006',
                name: 'Starlight Parade',
                tags: ['ambient', 'starlight'],
                author: {
                    _id: 'user-123e4567-e89b-12d3-a456-426614174004',
                    username: 'Stellar Beats'
                },
                belongsRef: 'playlist-001',
                previewURL: 'https://i.pinimg.com/736x/4d/0b/cb/4d0bcbf12ac0ba04c6c6dbba73c25682.jpg',
                sourceURL: 'https://example.com/audio/starlight-parade.mp3',
                uploadedAt: '2025-06-14T22:05:00.000Z',
                updatedAt: '2025-06-14T22:05:00.000Z',
                duration: 193
            },
            {
                id: 'song-002',
                name: 'Crimson Sky',
                tags: ['emotional', 'sky'],
                author: {
                    _id: 'user-123e4567-e89b-12d3-a456-426614174001',
                    username: 'Crimson Nova'
                },
                belongsRef: 'playlist-001',
                previewURL: 'https://i.pinimg.com/736x/54/31/11/543111cc572488fb2e88467c32ebda1b.jpg',
                sourceURL: 'https://example.com/audio/crimson-sky.mp3',
                uploadedAt: '2025-06-14T22:01:00.000Z',
                updatedAt: '2025-06-14T22:01:00.000Z',
                duration: 189
            }
        ],
        createdAt: '2025-06-14T22:10:00.000Z',
        updatedAt: '2025-06-14T22:15:00.000Z'
    },
    {
        id: 'playlist-002',
        name: 'Future Echoes',
        tags: ['futuristic', 'echo', 'ambient', 'calming'],
        previewURL: 'https://i.pinimg.com/1200x/72/91/73/729173dbe29f0370200e1025fc52b130.jpg',
        size: 2,
        songs: [
            {
                id: 'song-001',
                name: 'Midnight Echo',
                tags: ['midnight', 'soft'],
                author: {
                    _id: 'user-123e4567-e89b-12d3-a456-426614174000',
                    username: 'Aurora Pulse'
                },
                belongsRef: null,
                previewURL: 'https://i.pinimg.com/736x/65/ee/ff/65eeff4c209bf9c7badcd8a688136363.jpg',
                sourceURL: 'https://example.com/audio/midnight-echo.mp3',
                uploadedAt: '2025-06-14T22:00:00.000Z',
                updatedAt: '2025-06-14T22:00:00.000Z',
                duration: 214
            },
            {
                id: 'song-005',
                name: 'Echoes of Tomorrow',
                tags: ['sci-fi', 'echo'],
                author: {
                    _id: 'user-123e4567-e89b-12d3-a456-426614174003',
                    username: 'Future Fade'
                },
                belongsRef: null,
                previewURL: 'https://i.pinimg.com/736x/05/fa/73/05fa734ad6cc84d27ce940ca78a660e7.jpg',
                sourceURL: 'https://example.com/audio/echoes-of-tomorrow.mp3',
                uploadedAt: '2025-06-14T22:04:00.000Z',
                updatedAt: '2025-06-14T22:04:00.000Z',
                duration: 225
            }
        ],
        createdAt: '2025-06-15T10:00:00.000Z',
        updatedAt: '2025-06-15T10:45:00.000Z'
    },
    {
        id: 'playlist-003',
        name: 'Sunset Mirage',
        tags: ['sunset', 'desert', 'mirage'],
        previewURL: 'https://i.pinimg.com/736x/25/72/5e/25725e340e3ad7d162f1e07111c7874d.jpg',
        size: 2,
        songs: [
            {
                id: 'song-010',
                name: 'Golden Hour',
                tags: ['golden', 'warm'],
                author: {
                    _id: 'user-abc4567e89b12d3a456426614174008',
                    username: 'Solstice Flow'
                },
                belongsRef: 'playlist-003',
                previewURL: 'https://i.pinimg.com/1200x/89/c9/b5/89c9b5934fedb7abe26a18743501ab6a.jpg',
                sourceURL: 'https://example.com/audio/golden-hour.mp3',
                uploadedAt: '2025-06-18T19:00:00.000Z',
                updatedAt: '2025-06-18T19:00:00.000Z',
                duration: 202
            },
            {
                id: 'song-011',
                name: 'Mirage Run',
                tags: ['fast', 'mirage'],
                author: {
                    _id: 'user-abc4567e89b12d3a456426614174009',
                    username: 'Desert Mirage'
                },
                belongsRef: 'playlist-003',
                previewURL: 'https://i.pinimg.com/1200x/45/33/da/4533dae56e1c7f78ec33bded182eeb33.jpg',
                sourceURL: 'https://example.com/audio/mirage-run.mp3',
                uploadedAt: '2025-06-18T19:10:00.000Z',
                updatedAt: '2025-06-18T19:10:00.000Z',
                duration: 207
            }
        ],
        createdAt: '2025-06-18T18:50:00.000Z',
        updatedAt: '2025-06-18T19:15:00.000Z'
    },
    {
        id: 'playlist-004',
        name: 'Electric Heartbeats',
        tags: ['electronic', 'romance', 'beats'],
        previewURL: 'https://i.pinimg.com/1200x/c9/b6/2d/c9b62df9ccdf9eaab3d0ca5923600dd5.jpg',
        size: 1,
        songs: [
            {
                id: 'song-012',
                name: 'Synthetic Love',
                tags: ['robotic', 'love'],
                author: {
                    _id: 'user-xyz4567e89b12d3a456426614174010',
                    username: 'Robotica'
                },
                belongsRef: 'playlist-004',
                previewURL: 'https://i.pinimg.com/736x/ca/3d/47/ca3d47913cd3aed5f5cae988ae5d4f47.jpg',
                sourceURL: 'https://example.com/audio/synthetic-love.mp3',
                uploadedAt: '2025-06-20T21:00:00.000Z',
                updatedAt: '2025-06-20T21:00:00.000Z',
                duration: 199
            }
        ],
        createdAt: '2025-06-20T20:45:00.000Z',
        updatedAt: '2025-06-20T21:10:00.000Z'
    },
    {
        id: 'playlist-005',
        name: 'Cosmic Drift',
        tags: ['space', 'cosmic', 'drift'],
        previewURL: 'https://i.pinimg.com/736x/05/fa/73/05fa734ad6cc84d27ce940ca78a660e7.jpg',
        size: 2,
        songs: [
            {
                id: 'song-013',
                name: 'Orbiting Thoughts',
                tags: ['spacey', 'meditative'],
                author: {
                    _id: 'user-789e4567-e89b-12d3-a456-426614174011',
                    username: 'Galaxian'
                },
                belongsRef: 'playlist-005',
                previewURL: 'https://i.pinimg.com/736x/71/7a/38/717a3823ce697eaa9e882a715ab5725b.jpg',
                sourceURL: 'https://example.com/audio/orbiting-thoughts.mp3',
                uploadedAt: '2025-06-25T11:00:00.000Z',
                updatedAt: '2025-06-25T11:00:00.000Z',
                duration: 218
            },
            {
                id: 'song-014',
                name: 'Deep Space Lullaby',
                tags: ['lullaby', 'deep'],
                author: {
                    _id: 'user-789e4567-e89b-12d3-a456-426614174012',
                    username: 'Void Whisperer'
                },
                belongsRef: 'playlist-005',
                previewURL: 'https://i.pinimg.com/1200x/fa/7e/95/fa7e951811b4f63cf1a3307b24f6c9f8.jpg',
                sourceURL: 'https://example.com/audio/deep-space-lullaby.mp3',
                uploadedAt: '2025-06-25T11:10:00.000Z',
                updatedAt: '2025-06-25T11:10:00.000Z',
                duration: 230
            }
        ],
        createdAt: '2025-06-25T10:30:00.000Z',
        updatedAt: '2025-06-25T11:20:00.000Z'
    }
]

export default mockPlaylists