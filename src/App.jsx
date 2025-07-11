import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import SamuraiModel from './components/SamuraiModel'
import Navigation from './components/Navigation'
import SakuraPetalsTailwind from './components/SakuraPetalsTailwind'
import './App.css';
import './App.font.css';

import bgimg from "./assets/bgimg.jpg";
import batch from "./assets/batch.jpeg"; // Ensure this path is correct
import creditImg from "./assets/credit.png";
import logoImg from "./assets/logo.png";
import useIsMobile from "./hooks/use-is-mobile";
import { useState as useLocalState } from 'react';
import bgaudio from "./assets/bgaudio.mp3";
import muteIcon from "./assets/mute.svg";
import unmuteIcon from "./assets/unmute.svg";



function App() {
  const [animationPhase, setAnimationPhase] = useState('initial') // 'initial', 'rotating', 'moved'
  const [showLargeBatch, setShowLargeBatch] = useState(false);
  const audioRef = useRef(null);
  // Start audio muted by default to comply with browser autoplay policies
  const [muted, setMuted] = useState(true);
  const isMobile = useIsMobile();
  // Loading state for 3D and video
  const [loading, setLoading] = useLocalState(true);
  const [videoLoaded, setVideoLoaded] = useLocalState(true);
  const [modelLoaded, setModelLoaded] = useLocalState(true);

  useEffect(() => {
    if (videoLoaded && modelLoaded) {
      setLoading(false);
      // Start animation after 3 seconds
      const timer = setTimeout(() => {
        setAnimationPhase('rotating')
        setTimeout(() => {
          setAnimationPhase('moved')
        }, 2000)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [videoLoaded, modelLoaded])

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Loader Spinner */}
      {loading && (
        <div className="loader-bg">
          <span className="loader">Load&nbsp;ng</span>
        </div>
      )}
      {/* Red Circle Background Element - move behind video */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full opacity-20 blur-3xl z-[-1]"></div>
      {/* Background Image */}
      <img
        src={bgimg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 blur-[2px] !opacity-100"
        draggable={false}
      />
      {/* Navigation */}
      <Navigation />
      
      {/* Initial SAMURAI Text */}
      {animationPhase === 'initial' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <img
            src={logoImg}
            alt="Logo"
            className="w-[90%] h-auto object-contain "
            draggable={false}
          />
        </motion.div>
      )}
      
      {/* Content that appears after animation */}
      {animationPhase === 'moved' && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-0 md:left-8 right-2 top-[300px] transform -translate-y-1/2 z-10 max-w-2xl ps-2 md:ps-60"
        >
          <img
            src={logoImg}
            alt="Logo"
            className="w-full h-auto object-contain mb-6 mt-8"
            draggable={false}
          />
          <div className="relative flex flex-col justify-center items-center">
            <img
              src={batch}
              alt="Batch"
              className={`w-[90%] md:w-full h-auto object-contain mb-28 md:mb-2 transition-all duration-300 cursor-pointer batch-glow rounded-md ${showLargeBatch ? 'z-[100] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-auto max-h-[90vh] bg-black/80 p-4 rounded-md' : ''}`}
              draggable={false}
              onClick={() => setShowLargeBatch(true)}
            />
            {/* Download Button for Batch Image */}
            <div className="w-full flex justify-center mt-2">
              <a
                href={batch}
                download="batch.jpeg"
                className="bg-gradient-to-r from-red-500 to-red-900 text-white px-4 py-2 text-xl rounded font-medium focus:ring ring-black ring-opacity-10 shadow hover:scale-105 transition-transform duration-300 z-1000 gradient element-to-rotate"
                style={{zIndex: 1100}}
              >
                Download Image
              </a>
            </div>
            {showLargeBatch && (
              <div
                className="fixed inset-0 bg-black/70 z-[99] cursor-pointer rounded-sm"
                onClick={() => setShowLargeBatch(false)}
              />
            )}
          </div>
        
        </motion.div>
      )}
      
      {/* Sakura Petals Animation (Tailwind) */}
      <SakuraPetalsTailwind />

      {/* Animated Japanese Text Banner */}
      <div className="pointer-events-none fixed top-1/2 left-0 w-full z-0 flex items-center justify-center overflow-hidden" style={{transform: 'translateY(-50%)'}}>
        <div
          className="whitespace-nowrap animate-marquee font-black "
          style={{ fontSize: '250px', lineHeight: '1', fontWeight: 900, color: '#4B2524' }}
        >
          ソーシャルナイト2025 - 工学部ソラタ講堂にて
        </div>
      </div>
      {/* 3D Scene - move after Japanese text and set z-10 */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff4444" />
          <Environment preset="sunset" />
          <SamuraiModel animationPhase={animationPhase} onModelLoaded={() => setModelLoaded(true)} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Credit Image Bottom Center */}
      <img
        src={creditImg}
        alt="Credit"
        className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        style={{
          width: isMobile ? '300px' : '400px',
          height: 'auto'
        }}
        draggable={false}
        width={isMobile ? '180px' : '400px'}
        height={'auto'}
      />

      {/* Background Audio - only render when unmuted */}
      { !muted && (
        <audio
          ref={audioRef}
          src={bgaudio}
          autoPlay
          loop
        />
      )}
      {/* Audio Toggle Button */}
      <button
        className="fixed top-4 right-4 z-50 bg-black/10 text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-colors"
        onClick={() => {
          setMuted((m) => {
            const newMuted = !m;
            if (audioRef.current && !newMuted) {
              audioRef.current.play().catch(() => {});
            }
            return newMuted;
          });
        }}
        aria-label={muted ? 'Unmute background audio' : 'Mute background audio'}
      >
        <img
          src={muted ? muteIcon : unmuteIcon}
          alt={muted ? 'Unmute' : 'Mute'}
          className="w-6 h-6"
          draggable={false}
        />
      </button>
    </div>
  )
}

export default App

