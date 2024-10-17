import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Cake from './Cake';
import confetti from 'canvas-confetti';
export default function ReceiverPage() {
    const { id } = useParams();
    const [wishData, setWishData] = useState(null);
    const [candlesBlownOut, setCandlesBlownOut] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [loading, setLoading] = useState(true);
    const audioContext = useRef(null);
    const analyser = useRef(null);
    const dataArray = useRef(null);
    const animationFrameId = useRef(null);
    // Fetch the wish data from the backend API
    useEffect(() => {
        const fetchWish = async () => {
            try {
                const response = await fetch(`/api/wish/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setWishData(data);
                }
                else {
                    setWishData(null);
                }
            }
            catch (error) {
                console.error('Error fetching birthday wish:', error);
                setWishData(null);
            }
            finally {
                setLoading(false);
            }
        };
        fetchWish();
    }, [id]);
    useEffect(() => {
        if (isListening) {
            startListening();
        }
        else {
            stopListening();
        }
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isListening]);
    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext.current = new AudioContext();
            analyser.current = audioContext.current.createAnalyser();
            const source = audioContext.current.createMediaStreamSource(stream);
            source.connect(analyser.current);
            analyser.current.fftSize = 256;
            const bufferLength = analyser.current.frequencyBinCount;
            dataArray.current = new Uint8Array(bufferLength);
            detectBlow();
        }
        catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };
    const stopListening = () => {
        if (audioContext.current) {
            audioContext.current.close();
        }
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };
    const detectBlow = () => {
        if (!analyser.current || !dataArray.current)
            return;
        analyser.current.getByteFrequencyData(dataArray.current);
        const average = dataArray.current.reduce((a, b) => a + b) / dataArray.current.length;
        if (average > 100) {
            setCandlesBlownOut(true);
            setIsListening(false);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
        animationFrameId.current = requestAnimationFrame(detectBlow);
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-white-100", children: _jsx("div", { className: "spinner" }) }));
    }
    if (!wishData) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-white-100", children: _jsx("div", { className: "text-center", children: _jsx("p", { className: "text-lg text-gray-700", children: "Could not load birthday wish. Please reload the page." }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col items-center justify-center p-4", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "text-center", children: [_jsx(Cake, { age: parseInt(wishData.celebrantAge), isLit: !candlesBlownOut }), _jsx(AnimatePresence, { children: !candlesBlownOut && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "mt-4 text-white text-xl font-bold", children: ["Blow out your candles to reveal a birthday wish from ", wishData.senderName, "!"] })) }), !candlesBlownOut && (_jsx("button", { onClick: () => setIsListening(true), disabled: isListening, className: "mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: isListening ? 'Listening...' : 'Blow Out' })), _jsx(AnimatePresence, { children: candlesBlownOut && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "mt-8 text-white text-2xl font-bold", children: ["Happy Birthday, ", wishData.celebrantName, "!", _jsx("br", {}), wishData.message] })) })] }) }));
}
