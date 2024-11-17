import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import {
  FaPause,
  FaPlay,
  FaRandom,
  FaFastBackward,
  FaFastForward,
  FaHeart,
  FaRedo,
  FaTrashAlt,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute
} from "react-icons/fa";
import '../App.css'; 

const audioFiles = [
  { title: 'Majili', artist: 'Nagachaitanya, Samantha', url: '/songs/song1.mp3', albumArt: '/images/song1.jpg' },
  { title: 'Shershaah', artist: 'Siddharth, Kiara', url: '/songs/song2.mp3', albumArt: '/images/song2.jpg' },
  { title: 'Devara', artist: 'NTR, Jahnvi Kapoor', url: '/songs/song3.mp3', albumArt: '/images/song3.jpg' },
  { title: 'Jailer', artist: 'Rajinikanth, Ramya Krishna', url: '/songs/song4.mp3', albumArt: '/images/song4.jpg' },
  { title: 'Rayan', artist: 'Dhanush, Sandeep Kishan', url: '/songs/song5.mp3', albumArt: '/images/song5.jpg' },
  { title: 'I', artist: 'Vikram, Amy Jackson', url: '/songs/song6.mp3', albumArt: '/images/song6.jpg' },
  { title: 'Laapataa Ladies', artist: 'Aamir Khan, Kiran Rao', url: '/songs/song7.mp3', albumArt: '/images/song7.jpg' },
  { title: 'Rab Ne Bana Di Jodi', artist: 'Shah Rukh Khan, Anushka Sharma', url: '/songs/song8.mp3', albumArt: '/images/song8.jpg' },
  { title: 'Okkadu', artist: 'Mahesh Babu, Bhoomika Chawla', url: '/songs/song9.mp3', albumArt: '/images/song9.jpg' },
  { title: 'Raanjhanaa', artist: 'Dhanush, Sonam Kapoor, Abhay Deol', url: '/songs/song10.mp3', albumArt: '/images/song10.jpg' }
];

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [playedTime, setPlayedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const playerRef = useRef(null);

  const currentTrack = audioFiles[currentTrackIndex];

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSkipNext = () => {
    const nextIndex = isShuffling
      ? Math.floor(Math.random() * audioFiles.length)
      : (currentTrackIndex + 1) % audioFiles.length;
    setCurrentTrackIndex(nextIndex);
    setPlayedTime(0);
  };

  const handleSkipPrevious = () => {
    const prevIndex = isShuffling
      ? Math.floor(Math.random() * audioFiles.length)
      : (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    setCurrentTrackIndex(prevIndex);
    setPlayedTime(0);
  };

  const handleProgress = (state) => setPlayedTime(state.playedSeconds);

  const handleDuration = (duration) => setDuration(duration);

  const handleSeek = (time) => {
    setPlayedTime(time);
    playerRef.current.seekTo(time);
  };

  const handleShuffle = () => setIsShuffling(!isShuffling);

  const handleRepeat = () => setIsRepeating(!isRepeating);

  const addToWishlist = (index) => setWishlist([...wishlist, index]);

  const removeFromWishlist = (index) => setWishlist(wishlist.filter((item) => item !== index));

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.5 : 0);
  };

  return (
    <div className="music-player">
      <div className="track-info">
        <img src={currentTrack.albumArt} alt={currentTrack.title} />
        <div>
          <h2>{currentTrack.title}</h2>
          <p>{currentTrack.artist}</p>
        </div>
      </div>

      <div className="audio-controls">
        <button onClick={handleShuffle} className={isShuffling ? 'active' : ''}>
          <FaRandom />
        </button>
        <button onClick={handleSkipPrevious}>
          <FaFastBackward />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleSkipNext}>
          <FaFastForward />
        </button>
        <button onClick={handleMuteToggle}>
          {isMuted ? <FaVolumeMute /> : volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}
        </button>
        <button
          onClick={() => addToWishlist(currentTrackIndex)}
          style={{ color: wishlist.includes(currentTrackIndex) ? 'red' : 'inherit' }}
        >
          <FaHeart />
        </button>
        <button onClick={handleRepeat} className={isRepeating ? 'active' : ''}>
          <FaRedo />
        </button>
      </div>

      <div className="progress-bar">
        <span>{Math.floor(playedTime / 60)}:{Math.floor(playedTime % 60).toString().padStart(2, '0')}</span>
        <input
          type="range"
          value={playedTime}
          max={duration}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
        />
        <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
      </div>

      <div className="tracks-container">
        <div className="track-list">
          <h3>Track List</h3>
          <ul>
            {audioFiles.map((track, index) => (
              <li key={index}>
                <span
                  className={currentTrackIndex === index ? 'current-track' : ''}
                  onClick={() => setCurrentTrackIndex(index)}
                >
                  {track.title} - {track.artist}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="wishlist">
          <h3>Wishlist</h3>
          <ul>
            {wishlist.map((index) => (
              <li key={index}>
                <span>{audioFiles[index].title} - {audioFiles[index].artist}</span>
                <button onClick={() => removeFromWishlist(index)}>
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReactPlayer
        ref={playerRef}
        url={currentTrack.url}
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleSkipNext}
        loop={isRepeating}
        width="0"
        height="0"
      />
    </div>
  );
};

export default MusicPlayer;
