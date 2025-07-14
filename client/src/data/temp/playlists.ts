import type { TPlaylist } from "@/types/mediaEntities.types.ts"

const mockPlaylists: TPlaylist[] = [
    {
        id: 'playlist-001',
        name: 'Night Chillwave',
        previewURL: 'https://i.pinimg.com/736x/5b/f0/78/5bf0780314175503b9b4a1c7a350cc34.jpg',
        size: 3,
        songs: [
            {
                id: 'song-003',
                name: 'Neon Dreams',
                author: {
                    id: 'user-123e4567-e89b-12d3-a456-426614174002',
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
                author: {
                    id: 'user-123e4567-e89b-12d3-a456-426614174004',
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
                author: {
                    id: 'user-123e4567-e89b-12d3-a456-426614174001',
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
        previewURL: 'https://i.pinimg.com/1200x/72/91/73/729173dbe29f0370200e1025fc52b130.jpg',
        size: 2,
        songs: [
            {
                id: 'song-001',
                name: 'Midnight Echo',
                author: {
                    id: 'user-123e4567-e89b-12d3-a456-426614174000',
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
                author: {
                    id: 'user-123e4567-e89b-12d3-a456-426614174003',
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
        previewURL: 'https://i.pinimg.com/736x/25/72/5e/25725e340e3ad7d162f1e07111c7874d.jpg',
        size: 2,
        songs: [
            {
                id: 'song-010',
                name: 'Golden Hour',
                author: {
                    id: 'user-abc4567e89b12d3a456426614174008',
                    username: 'Solstice Flow'
                },
                belongsRef: 'playlist-003',
                previewURL: 'https://i.pinimg.com/736x/70/e4/34/70e4346a5dcaee130e80f1e66ddf36db.jpg',
                sourceURL: 'https://example.com/audio/golden-hour.mp3',
                uploadedAt: '2025-06-18T19:00:00.000Z',
                updatedAt: '2025-06-18T19:00:00.000Z',
                duration: 202
            },
            {
                id: 'song-011',
                name: 'Mirage Run',
                author: {
                    id: 'user-abc4567e89b12d3a456426614174009',
                    username: 'Desert Mirage'
                },
                belongsRef: 'playlist-003',
                previewURL: 'https://i.pinimg.com/736x/68/15/7d/68157dd46936f7a50a5c670622ff92d5.jpg',
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
        previewURL: 'https://i.pinimg.com/1200x/c9/b6/2d/c9b62df9ccdf9eaab3d0ca5923600dd5.jpg',
        size: 1,
        songs: [
            {
                id: 'song-012',
                name: 'Synthetic Love',
                author: {
                    id: 'user-xyz4567e89b12d3a456426614174010',
                    username: 'Robotica'
                },
                belongsRef: 'playlist-004',
                previewURL: 'https://i.pinimg.com/736x/ab/cd/ef/abcdef1234567890abcdef1234567890.jpg',
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
        previewURL: 'https://i.pinimg.com/736x/05/fa/73/05fa734ad6cc84d27ce940ca78a660e7.jpg',
        size: 2,
        songs: [
            {
                id: 'song-013',
                name: 'Orbiting Thoughts',
                author: {
                    id: 'user-789e4567-e89b-12d3-a456-426614174011',
                    username: 'Galaxian'
                },
                belongsRef: 'playlist-005',
                previewURL: 'https://i.pinimg.com/736x/21/43/65/214365c7fe3e8ff4b8ffbcf6e24f5a98.jpg',
                sourceURL: 'https://example.com/audio/orbiting-thoughts.mp3',
                uploadedAt: '2025-06-25T11:00:00.000Z',
                updatedAt: '2025-06-25T11:00:00.000Z',
                duration: 218
            },
            {
                id: 'song-014',
                name: 'Deep Space Lullaby',
                author: {
                    id: 'user-789e4567-e89b-12d3-a456-426614174012',
                    username: 'Void Whisperer'
                },
                belongsRef: 'playlist-005',
                previewURL: 'https://i.pinimg.com/736x/3e/5f/7a/3e5f7a31c74b21f1f5b9a71287e0cfb9.jpg',
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