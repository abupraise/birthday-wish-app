import React from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export const WishReveal: React.FC<{ wish: string }> = ({ wish }) => {
  React.useEffect(() => {
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