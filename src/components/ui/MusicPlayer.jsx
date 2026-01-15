import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        // Create audio instance
        audioRef.current = new Audio('/music/background.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = 0.4

        // Attempt autoplay
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true)
            }).catch(error => {
                // Auto-play was prevented
                console.log("Autoplay prevented:", error)
                setIsPlaying(false)
            })
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="absolute top-6 right-6 z-50">
            <button
                onClick={togglePlay}
                className={`
                    group relative flex items-center justify-center w-12 h-12 rounded-full
                    backdrop-blur-md border transition-all duration-300
                    ${isPlaying
                        ? 'bg-teal/10 border-teal text-teal shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'bg-black/20 border-white/10 text-white/40 hover:text-white hover:border-white/30'
                    }
                `}
                aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
            >
                {/* Pulse effect when playing */}
                {isPlaying && (
                    <span className="absolute inset-0 rounded-full border border-teal/50 animate-ping opacity-20" />
                )}

                {isPlaying ? (
                    // Pause Icon
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                ) : (
                    // Play Icon
                    <svg className="w-5 h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </button>
        </div>
    )
}
