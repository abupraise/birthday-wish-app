import { motion } from 'framer-motion'
import Candle from './Candle'

interface CakeProps {
  age: number
  isLit?: boolean
}

export default function Cake({ age, isLit = true }: CakeProps) {
  const cakeWidth = Math.max(320, age * 30)
  const cakeHeight = 240

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto"
      style={{ width: cakeWidth, height: cakeHeight + 80 }}
    >
      {/* Cake plate */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full"
        style={{ width: cakeWidth + 20, height: 16 }}
      ></div>

      {/* Cake tiers */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg z-10"
        style={{ width: cakeWidth - 20, height: cakeHeight * 0.4 }}
      ></div>
      <div
        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg z-20"
        style={{ width: cakeWidth - 80, height: cakeHeight * 0.3 }}
      ></div>
      <div
        className="absolute bottom-48 left-1/2 transform -translate-x-1/2 translate-y-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg z-30"
        style={{ width: cakeWidth - 160, height: cakeHeight * 0.2 }}
      ></div>

      {/* Decorative swirls */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 border-b-4 border-white rounded-full z-40"
        style={{ width: cakeWidth - 50, height: 16 }}
      ></div>

      {/* Decorative dots */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full z-40"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        ></div>
      ))}

      {/* Candles */}
      <div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-center items-end z-1"
        style={{ width: cakeWidth - 20 }}
      >
        {[...Array(age)].map((_, index) => (
          <Candle key={index} isLit={isLit} />
        ))}
      </div>
    </motion.div>
  )
}
