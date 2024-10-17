import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SenderPage from '../src/component/SenderPage';
import ReceiverPage from './component/ReceiverPage';
export default function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(SenderPage, {}) }), _jsx(Route, { path: "/wish/:id", element: _jsx(ReceiverPage, {}) })] }) }));
}
