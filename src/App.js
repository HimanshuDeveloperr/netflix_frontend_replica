import "./App.scss";
import Header from "./Components/Header";
import HomeBanner from "./Components/HomeBanner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login'
import Banner from "./Components/Banner";
import List from "./Components/List";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <HomeBanner />
            </div>
          }
        />
        <Route path="/login" element={
          <div className="App">
            <Header/>
            <Login/>
          </div>
        }/>
        <Route path="/dashboard" element={
          <div className="App">
            <Header/>
            <Banner/>
            <List/>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
