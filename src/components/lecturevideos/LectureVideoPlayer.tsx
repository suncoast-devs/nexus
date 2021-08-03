import React from 'react'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  // @ts-ignore -- there are no types for this
} from 'video-react'
import { LectureVideo } from '../models'
import { recordLectureVideoPlayback } from './recordLectureVideoPlayback'

export function LectureVideoPlayer({ lectureVideo }: { lectureVideo: LectureVideo }) {
  // If we are transitioning from never started to started
  // then record a playback event.
  const handleStateChange = (state: { hasStarted: boolean }, prevState: { hasStarted: boolean }) => {
    if (state.hasStarted && !prevState.hasStarted) {
      recordLectureVideoPlayback(lectureVideo.id)
    }
  }

  return (
    <Player
      preload="none"
      // @ts-ignore
      ref={player => {
        player && player.subscribeToStateChange(handleStateChange)
      }}
    >
      <source src={lectureVideo.videoUrl} />
      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[4, 3, 2.5, 2.25, 2, 1.5, 1.25, 1, 0.5, 0.25]} order={7.1} />
        <VolumeMenuButton />
      </ControlBar>
    </Player>
  )
}
