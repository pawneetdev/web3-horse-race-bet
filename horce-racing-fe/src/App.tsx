import './App.scss';
import BiddingComponent from "./components/BidComponent/BidComponent"
import HomeComponent from "./components/Home/HomeComponent"
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtfolioComponent from "./components/PortfolioComponent/ProtfolioComponent";
import SigninSignup from "./components/SigninSignup/SigninSignup";

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route path="/" element={<HomeComponent/>}>
        </Route>
        <Route path="/bid" element={<BiddingComponent/>}>
        </Route>
        <Route path="/portfolio" element={<ProtfolioComponent/>}>
        </Route>
        <Route path="/login" element={<SigninSignup/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
