'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import gifImage from 'src/assets/4A5.gif';

const Cake: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-80 h-96 mx-auto"
    >
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-4 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full"></div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-56 h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg"></div>
      <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg"></div>
      <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"></div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-60 h-4 border-b-4 border-white rounded-full"></div>
      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 w-52 h-4 border-b-4 border-white rounded-full"></div>
      <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 w-44 h-4 border-b-4 border-white rounded-full"></div>
      <div className="absolute bottom-66 left-1/2 transform -translate-x-1/2 w-36 h-4 border-b-4 border-white rounded-full"></div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        ></div>
      ))}

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex">
        <div className="w-6 h-12 bg-purple-300 rounded-full transform -rotate-15"></div>
        <div className="w-6 h-12 bg-purple-400 rounded-full"></div>
        <div className="w-6 h-12 bg-purple-300 rounded-full transform rotate-15"></div>
      </div>
      <div className="absolute top-4 left-1/4 transform -translate-x-1/2">
        <div className="w-4 h-8 bg-green-400 rounded-full transform rotate-30"></div>
      </div>
      <div className="absolute top-4 right-1/4 transform translate-x-1/2">
        <div className="w-4 h-8 bg-green-400 rounded-full transform -rotate-30"></div>
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center">
        {children}
      </div>
    </motion.div>
  )
}

const Candle: React.FC<{ isLit: boolean }> = ({ isLit }) => {
  return (
    <div className="relative mx-1 w-6 h-24">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 96 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-sm rounded-b-3xl border border-gray-300"
      ></motion.div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-700"></div>

      {isLit && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-4 h-6 bg-gradient-to-t from-orange-400 via-orange-300 to-yellow-200 rounded-full transform origin-bottom scale-x-50"></div>
        </motion.div>
      )}
    </div>
  )
}

const WishReveal: React.FC<{ wish: string }> = ({ wish }) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-white text-2xl font-bold"
    >
      {wish}
    </motion.div>
  )
}

export default function BirthdayWishApp() {
  const [age, setAge] = useState<number>(0)
  const [senderName, setSenderName] = useState<string>('')
  const [wish, setWish] = useState<string>('')
  const [isReady, setIsReady] = useState<boolean>(false)
  const [candlesBlownOut, setCandlesBlownOut] = useState<boolean>(false)
  const [isListening, setIsListening] = useState<boolean>(false)
  const audioContext = useRef<AudioContext | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const dataArray = useRef<Uint8Array | null>(null)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (isListening) {
      startListening()
    } else {
      stopListening()
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isListening])

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContext.current = new AudioContext()
      analyser.current = audioContext.current.createAnalyser()
      const source = audioContext.current.createMediaStreamSource(stream)
      source.connect(analyser.current)
      analyser.current.fftSize = 256
      const bufferLength = analyser.current.frequencyBinCount
      dataArray.current = new Uint8Array(bufferLength)
      detectBlow()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopListening = () => {
    if (audioContext.current) {
      audioContext.current.close()
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
  }

  const detectBlow = () => {
    if (!analyser.current || !dataArray.current) return

    analyser.current.getByteFrequencyData(dataArray.current)
    const average = dataArray.current.reduce((a, b) => a + b) / dataArray.current.length

    if (average > 100) {
      setCandlesBlownOut(true)
      setIsListening(false)
    }

    animationFrameId.current = requestAnimationFrame(detectBlow)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsReady(true)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        background: 'linear-gradient(to bottom right, #f06292, #ba68c8)',
        backgroundImage: `url(${gifImage})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <AnimatePresence>
        {!isReady ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Celebrant's Age</label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  required
                  min="1"
                  max="150"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  id="senderName"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="wish" className="block text-sm font-medium text-gray-700">Birthday Wish</label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Birthday Wish
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Cake>
              {Array.from({ length: age }).map((_, index) => (
                <Candle key={index} isLit={!candlesBlownOut} />
              ))}
            </Cake>
            {!candlesBlownOut && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white text-xl font-bold"
              >
                Blow out your candles to reveal a birthday wish from {senderName}!
              </motion.div>
            )}
            {!candlesBlownOut && (
              <button
                onClick={() => setIsListening(true)}
                disabled={isListening}
                className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isListening ? 'Listening...' : 'Start Listening'}
              </button>
            )}
            {candlesBlownOut && <WishReveal wish={wish} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}