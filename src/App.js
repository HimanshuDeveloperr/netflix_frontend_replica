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
        <Route path="/register" element={
          <div className="App">
            <Header/>
            <Login/>
          </div>
        }/>
        <Route path="/dashboard" element={
          <div className="App">
            <Header/>
            <Banner/>
            <List title="Netflix Originals" param="originals"/>
            <List title="Trending Now" param="trending"/>
              <List title="Now Playing" param="now_playing"/>
              <List title="popular" param="popular"/>
              <List title="Top Rated" param="top_rated"/>
              <List title="Upcoming" param="upcoming"/>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
