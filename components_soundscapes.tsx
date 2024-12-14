"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, VolumeX } from 'lucide-react'

const SOUNDS = [
  { name: "Rain", file: "/sounds/rain.mp3" },
  { name: "Ocean Waves", file: "/sounds/ocean.mp3" },
  { name: "Forest", file: "/sounds/forest.mp3" },
  { name: "White Noise", file: "/sounds/white-noise.mp3" },
]

export function Soundscapes() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState(SOUNDS[0])
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeSound = (soundName: string) => {
    const newSound = SOUNDS.find(sound => sound.name === soundName) || SOUNDS[0]
    setCurrentSound(newSound)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.src = newSound.file
      audioRef.current.load()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soundscapes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={changeSound} value={currentSound.name}>
            <SelectTrigger>
              <SelectValue placeholder="Select a sound" />
            </SelectTrigger>
            <SelectContent>
              {SOUNDS.map((sound) => (
                <SelectItem key={sound.name} value={sound.name}>
                  {sound.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={togglePlay} className="w-full">
            {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"} {currentSound.name}
          </Button>
          <audio ref={audioRef} src={currentSound.file} loop />
        </div>
      </CardContent>
    </Card>
  )
}

