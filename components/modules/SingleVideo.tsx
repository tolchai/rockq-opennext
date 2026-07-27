'use client';

import cn from 'classnames';
import YouTube from 'react-youtube';
import React, { useState, useRef } from 'react';
// import { Play, Pause } from 'lucide-react';

import Play from '@/public/images/ui/play.svg';

import Container from '../Container';
import { ModulesModulesSingleVideoLayout } from '@/graphql/generated';

interface SingleVideoProps {
  module: ModulesModulesSingleVideoLayout;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ module }) => {
  const { videoUrl } = module;

  // id is behing v=
  const videoId = videoUrl?.split('v=')[1];

  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
        setShowOverlay(false); // Hide overlay when playing
      }
    }
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  const onPlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const onPause = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const onEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <Container>
      <div
        className={cn(
          'w-full rounded-xl overflow-hidden aspect-video bg-black relative group'
        )}
      >
        {videoUrl && (
          <>
            <YouTube
              videoId={videoId}
              className='relative w-full h-full cursor-pointer'
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  controls: 0, // Hide YouTube controls
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  fs: 1, // Allow fullscreen
                },
              }}
              onReady={onReady}
              onPlay={onPlay}
              onPause={onPause}
              onEnd={onEnd}
            />

            {/* Play Button - Always visible when paused */}
            {!isPlaying && (
              <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none bg-black/20'>
                <button
                  onClick={handlePlayPause}
                  className='flex items-center justify-center w-16 h-10 transition-all transform rounded-sm cursor-pointer pointer-events-auto hover:scale-125 scale-120 text-green-dark bg-green-light'
                >
                  <span className='w-6'>
                    <Play />
                  </span>
                  {/* <Play className='w-8 h-8 ml-1 text-gray-800' /> */}
                </button>
              </div>
            )}

            {/* Pause Button - Only visible on hover when playing */}
            {/* {isPlaying && (
              <div className='absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-black/20'>
                <button
                  onClick={handlePlayPause}
                  className='flex items-center justify-center w-20 h-20 transition-all transform rounded-full shadow-lg pointer-events-auto bg-white/90 hover:bg-white hover:scale-110'
                >
                  <Pause className='w-8 h-8 text-gray-800' />
                </button>
              </div>
            )} */}

            {/* Bottom Controls - Only visible on hover when playing */}
            {/* {isPlaying && (
              <div
                className={cn(
                  'absolute bottom-4 left-4 right-4 flex items-center justify-between',
                  'bg-black/50 rounded-lg px-4 py-2 transition-opacity duration-300',
                  'opacity-0 group-hover:opacity-100'
                )}
              >
                <button
                  onClick={handlePlayPause}
                  className='flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-white/20 hover:bg-white/30'
                >
                  <Pause className='w-4 h-4 text-white' />
                </button>

                <button
                  onClick={() =>
                    playerRef.current?.getIframe().requestFullscreen()
                  }
                  className='text-sm text-white transition-colors hover:text-gray-300'
                >
                  Fullscreen
                </button>
              </div>
            )} */}
          </>
        )}
      </div>
    </Container>
  );
};

export default SingleVideo;
