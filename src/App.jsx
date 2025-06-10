import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Website/Homepage";
import Aboutpage from "./Pages/Website/Aboutpage";
import News from "./Pages/Website/News";
import CrimeMap from "./Pages/Website/CrimeMap";
import ReporttAnon from "./Pages/Website/ReporttAnon";
import TermsOfUse from "./Pages/Website/TermsOfUse";
import PrivacyPolicy from "./Pages/Website/PrivacyPolicy";
import ErrorPage from "./Pages/Website/404";
import SingleNewsPage from "./Components/Website/News/SingleNews";
import Login from "./Pages/Webapp/Login";
import SignUp from "./Pages/Webapp/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about-us" element={<Aboutpage />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<SingleNewsPage />} />
      <Route path="/crime-map" element={<CrimeMap />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/report-anonymously" element={<ReporttAnon />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
