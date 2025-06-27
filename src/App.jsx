import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import SamuraiModel from './components/SamuraiModel'
import Navigation from './components/Navigation'
import SakuraPetalsTailwind from './components/SakuraPetalsTailwind'
import './App.css';

import bgvideo from "./assets/bgvideo.mp4";
import creditImg from "./assets/credit.png";
import logoImg from "./assets/logo.png";
import batchImg from "./assets/batch4to.jpeg";

function App() {
  const [animationPhase, setAnimationPhase] = useState('initial') // 'initial', 'rotating', 'moved'
  const [showLargeBatch, setShowLargeBatch] = useState(false);

  useEffect(() => {
    // Start animation after 3 seconds
    const timer = setTimeout(() => {
      setAnimationPhase('rotating')
      
      // Move to final position after rotation
      setTimeout(() => {
        setAnimationPhase('moved')
      }, 2000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={bgvideo}
        autoPlay
        loop
        muted
        playsInline
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
            className="w-[90%] h-auto object-contain"
            draggable={false}
          />
        </motion.div>
      )}
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff4444" />
          
          {/* Environment for reflections */}
          <Environment preset="sunset" />
          
          {/* Samurai Model */}
          <SamuraiModel animationPhase={animationPhase} />

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Content that appears after animation */}
      {animationPhase === 'moved' && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-8 top-[300px] transform -translate-y-1/2 z-10 max-w-2xl ps-2 md:ps-60"
        >
          <img
            src={logoImg}
            alt="Logo"
            className="w-full h-auto object-contain mb-6"
            draggable={false}
          />
          <div className="relative flex justify-center items-center">
            <img
              src={batchImg}
              alt="Batch"
              className={`w-full h-auto object-contain mb-8 rounded-lg shadow-lg transition-all duration-300 cursor-pointer batch-glow ${showLargeBatch ? 'z-[100] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-auto max-h-[90vh] bg-black/80 p-4' : ''}`}
              draggable={false}
              onClick={() => setShowLargeBatch(true)}
            />
            {showLargeBatch && (
              <div
                className="fixed inset-0 bg-black/70 z-[99] cursor-pointer"
                onClick={() => setShowLargeBatch(false)}
              />
            )}
          </div>
        
        </motion.div>
      )}
      
      {/* Sakura Petals Animation (Tailwind) */}
      <SakuraPetalsTailwind />
      
      {/* Red Circle Background Element */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full opacity-20 blur-3xl"></div>

      {/* Credit Image Bottom Center */}
      <img
        src={creditImg}
        alt="Credit"
        className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 w-40  z-50"
        style={{width: '400px', height: 'auto'}}
        draggable={false}
        width={'400px'}
        height={'auto'}
      />
    </div>
  )
}

export default App

