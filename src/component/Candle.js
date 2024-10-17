import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function Candle({ isLit }) {
    return (_jsxs("div", { className: "relative mx-0.5 w-4 h-16", children: [_jsx(motion.div, { initial: { height: 0 }, animate: { height: 64 }, transition: { duration: 0.5 }, className: "absolute bottom-0 w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-sm rounded-b-3xl border border-gray-300" }), _jsx("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-700" }), isLit && (_jsx(motion.div, { initial: { scale: 0 }, animate: {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }, transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }, className: "absolute -top-4 left-[0.15rem] transform -translate-x-1/2", children: _jsx("div", { className: "w-3 h-4 bg-gradient-to-t from-orange-400 via-orange-300 to-yellow-200 rounded-full transform origin-bottom scale-x-50" }) }))] }));
}
