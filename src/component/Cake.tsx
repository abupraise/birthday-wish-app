import { motion } from 'framer-motion'
import Candle from './Candle'

interface CakeProps {
  age: number
  isLit?: boolean
}

export default function Cake({ age, isLit = true }: CakeProps) {
  const baseCakeWidth = 320
  const candleWidth = 30
  const maxWidth = 960
  const cakeWidth = Math.min(Math.max(baseCakeWidth, age * candleWidth), maxWidth)
  const cakeHeight = Math.min(240, cakeWidth * 0.75)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto w-full"
      style={{
        maxWidth: cakeWidth,
        height: cakeHeight + 80,
        transform: `scale(${Math.min(1, window.innerWidth / cakeWidth)})`,
        transformOrigin: 'top center'
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full"
        style={{ width: `calc(100% + 20px)`, height: '6.67%' }}
      ></div>

      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg z-40"
        style={{ width: 'calc(100% - 20px)', height: '40%' }}
      ></div>
      {/* <div
        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg z-30"
        style={{ width: 'calc(100% - 80px)', height: '30%' }}
      ></div>
      <div
        className="absolute bottom-48 left-1/2 transform -translate-x-1/2 translate-y-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg z-20"
        style={{ width: 'calc(100% - 160px)', height: '20%' }}
      ></div> */}

      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 border-b-4 border-white rounded-full z-10"
        style={{ width: 'calc(100% - 50px)', height: '6.67%' }}
      ></div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full z-50"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        ></div>
      ))}
      <div
        className="absolute top-32 left-1/2 transform -translate-x-1/2 flex justify-center items-end z-1"
        style={{ width: 'calc(100% - 20px)' }}
      >
        {[...Array(age)].map((_, index) => (
          <Candle key={index} isLit={isLit} />
        ))}
      </div>
    </motion.div>
  )
}