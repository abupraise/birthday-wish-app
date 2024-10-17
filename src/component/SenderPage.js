import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Cake from './Cake';
export default function SenderPage() {
    const [celebrantName, setCelebrantName] = useState('');
    const [celebrantAge, setCelebrantAge] = useState('');
    const [senderName, setSenderName] = useState('');
    const [message, setMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/wish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ celebrantName, celebrantAge, senderName, message }),
            });
            if (!response.ok) {
                throw new Error('Failed to save the wish.');
            }
            const data = await response.json();
            setGeneratedLink(`${window.location.origin}/wish/${data.id}`);
        }
        catch (error) {
            console.error('Error creating birthday wish:', error);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col items-center justify-center p-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-white rounded-lg shadow-xl p-6 w-full max-w-md", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Create a Birthday Wish" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "celebrantName", className: "block text-sm font-medium text-gray-700", children: "Celebrant's Name" }), _jsx("input", { id: "celebrantName", type: "text", value: celebrantName, onChange: (e) => setCelebrantName(e.target.value), required: true, className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "celebrantAge", className: "block text-sm font-medium text-gray-700", children: "Celebrant's Age" }), _jsx("input", { id: "celebrantAge", type: "number", value: celebrantAge, onChange: (e) => setCelebrantAge(e.target.value), required: true, min: "1", max: "150", className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "senderName", className: "block text-sm font-medium text-gray-700", children: "Your Name" }), _jsx("input", { id: "senderName", type: "text", value: senderName, onChange: (e) => setSenderName(e.target.value), required: true, className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700", children: "Birthday Wish" }), _jsx("textarea", { id: "message", value: message, onChange: (e) => setMessage(e.target.value), required: true, className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("button", { type: "submit", className: "py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Generate Link" }), _jsx("button", { type: "button", onClick: () => setIsPreviewMode(!isPreviewMode), className: "py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", children: isPreviewMode ? 'Exit Preview' : 'Preview' })] })] }), generatedLink && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-700", children: "Share this link with the celebrant:" }), _jsx("a", { href: generatedLink, className: "text-indigo-600 hover:text-indigo-800", target: "_blank", rel: "noopener noreferrer", children: generatedLink })] }))] }), isPreviewMode && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "mt-8 text-center", children: [_jsx(Cake, { age: parseInt(celebrantAge) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-4 text-white text-xl font-bold", children: ["Blow out your candles to reveal a birthday wish from ", senderName, "!"] })] }))] }));
}
