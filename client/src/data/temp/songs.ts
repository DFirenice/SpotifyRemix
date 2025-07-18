import type { TSong } from "@/types/mediaEntities.types.ts"

const mockSongs: TSong[] = [
  {
    id: 'song-001',
    name: 'Midnight Echo',
    tags: ['ambient', 'midnight', 'chill'],
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
    id: 'song-002',
    name: 'Crimson Sky',
    tags: ['emotional', 'sky', 'synthwave'],
    author: {
      id: 'user-123e4567-e89b-12d3-a456-426614174001',
      username: 'Crimson Nova'
    },
    belongsRef: 'playlist-002',
    previewURL: 'https://i.pinimg.com/736x/54/31/11/543111cc572488fb2e88467c32ebda1b.jpg',
    sourceURL: 'https://example.com/audio/crimson-sky.mp3',
    uploadedAt: '2025-06-14T22:01:00.000Z',
    updatedAt: '2025-06-14T22:01:00.000Z',
    duration: 189
  },
  {
    id: 'song-003',
    name: 'Neon Dreams',
    tags: ['dreamy', 'retro', 'night'],
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
    id: 'song-004',
    name: 'Silver Horizon',
    tags: ['epic', 'horizon', 'future'],
    author: {
      id: 'user-123e4567-e89b-12d3-a456-426614174000',
      username: 'Aurora Pulse'
    },
    belongsRef: null,
    previewURL: 'https://i.pinimg.com/736x/ae/e0/ed/aee0ed43c209c2cbb10f058d59187aec.jpg',
    sourceURL: 'https://example.com/audio/silver-horizon.mp3',
    uploadedAt: '2025-06-14T22:03:00.000Z',
    updatedAt: '2025-06-14T22:03:00.000Z',
    duration: 237
  },
  {
    id: 'song-005',
    name: 'Echoes of Tomorrow',
    tags: ['sci-fi', 'echo', 'futuristic'],
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
  },
  {
    id: 'song-006',
    name: 'Starlight Parade',
    tags: ['starlight', 'lofi', 'parade'],
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
  }
]

export default mockSongs