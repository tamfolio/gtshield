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
import Dashboard from "./Pages/Webapp/Dashboard/Home";
import GatewayShieldReports from "./Pages/Webapp/Dashboard/Reports";
import ReportDetails from "./Pages/Webapp/Dashboard/ReportDetails";
import FeedbackPage from "./Pages/Webapp/Dashboard/Pages/Feedback";
import Notifications from "./Pages/Webapp/Dashboard/Pages/Notifications";
import Community from "./Pages/Webapp/Dashboard/Pages/Community";
import BlogPostDetail from "./Pages/Webapp/Dashboard/Pages/BlogPostDetails";
import Survey from "./Pages/Webapp/Dashboard/Pages/Survey";
import Profile from "./Pages/Webapp/Dashboard/Pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordFlow from "./Components/Webapp/Auth/ForgotPassword";
import SosComponent from "./Pages/Webapp/Dashboard/Pages/SOS/SosComponent";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<Aboutpage />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<SingleNewsPage />} />
        <Route path="/crime-map" element={<CrimeMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/report-incident" element={<ReporttAnon />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/reports" element={<GatewayShieldReports />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/communities" element={<Community />} />
        <Route path="/sos" element={<SosComponent />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
        <Route path="/communities/:id" element={<BlogPostDetail />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
