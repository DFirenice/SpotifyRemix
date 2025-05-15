declare module 'react-howler' {
    import * as React from 'react'
  
    export interface ReactHowlerProps {
      src: string | string[]
      playing?: boolean
      loop?: boolean
      mute?: boolean
      volume?: number
      preload?: boolean | 'auto' | 'metadata' | 'none'
      html5?: boolean
      format?: string[]
      onPlay?: () => void
      onEnd?: () => void
      onPause?: () => void
      onStop?: () => void
      onLoad?: () => void
      onLoadError?: (id: number, error: any) => void
    }
  
    export default class ReactHowler extends React.Component<ReactHowlerProps> {
      howler: Howl
    }
  }
  