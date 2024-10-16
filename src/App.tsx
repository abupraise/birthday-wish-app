import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SenderPage from '../src/component/SenderPage'
import ReceiverPage from './component/ReceiverPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SenderPage />} />
        <Route path="/wish/:id" element={<ReceiverPage />} />
      </Routes>
    </Router>
  )
}