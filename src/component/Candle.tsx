import React from 'react'
import { motion } from 'framer-motion'

interface CandleProps {
  isLit: boolean
}

export default function Candle({ isLit }: CandleProps) {
  return (
    <div className="relative mx-0.5 w-4 h-16">
      {/* Candle body */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-sm rounded-b-3xl border border-gray-300"
      ></motion.div>
      
      {/* Candle wick */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-700"></div>
      
      {/* Candle flame */}
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
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-3 h-4 bg-gradient-to-t from-orange-400 via-orange-300 to-yellow-200 rounded-full transform origin-bottom scale-x-50"></div>
        </motion.div>
      )}
    </div>
  )
}