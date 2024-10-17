import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import Candle from './Candle';
export default function Cake({ age, isLit = true }) {
    const baseCakeWidth = 320;
    const candleWidth = 30;
    const maxWidth = 960;
    const cakeWidth = Math.min(Math.max(baseCakeWidth, age * candleWidth), maxWidth);
    const cakeHeight = Math.min(240, cakeWidth * 0.75);
    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "relative mx-auto w-full", style: {
            maxWidth: cakeWidth,
            height: cakeHeight + 80,
            transform: `scale(${Math.min(1, window.innerWidth / cakeWidth)})`,
            transformOrigin: 'top center'
        }, children: [_jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full", style: { width: `calc(100% + 20px)`, height: '6.67%' } }), _jsx("div", { className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg z-40", style: { width: 'calc(100% - 20px)', height: '40%' } }), _jsx("div", { className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 border-b-4 border-white rounded-full z-10", style: { width: 'calc(100% - 50px)', height: '6.67%' } }), [...Array(20)].map((_, i) => (_jsx("div", { className: "absolute w-1 h-1 bg-white rounded-full z-50", style: {
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                } }, i))), _jsx("div", { className: "absolute top-32 left-1/2 transform -translate-x-1/2 flex justify-center items-end z-1", style: { width: 'calc(100% - 20px)' }, children: [...Array(age)].map((_, index) => (_jsx(Candle, { isLit: isLit }, index))) })] }));
}
