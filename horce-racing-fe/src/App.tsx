import './App.scss';
import BiddingComponent from "./components/BidComponent/BidComponent"
import HomeComponent from "./components/Home/HomeComponent"
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route path="/" element={<HomeComponent/>}>
        </Route>
        <Route path="/bid" element={<BiddingComponent/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
