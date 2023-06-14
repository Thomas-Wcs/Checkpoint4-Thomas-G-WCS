import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AboutPage from "./components/about/AboutPage";
import UserFavorite from "./components/dashbord/UserFavorite";
import EditProfile from "./components/dashbord/EditProfile";
import UserProfile from "./components/dashbord/UserProfile";
import AdminPanel from "./components/adminPannel/AdminPanel";
import Header from "./components/Header/Header";
import ConnectionPage from "./components/User/ConnectionPage";
import Profile from "./components/User/Profile";
import Footer from "./components/footer/Footer";
import DataTable from "./components/adminPannel/DataTable";
import VideosManagement from "./components/adminPannel/VideosManagement";
import AdvertsManagement from "./components/advertising/AdvertManagement";
import Homepage2 from "./pages/Homepage2";
import VideoUpdate from "./components/adminPannel/VideoUpdate";
import VideoAdd from "./components/adminPannel/VideoAdd";
import AdminWall from "./utils/AdminWall";
import AdvertAdd from "./components/advertising/AdvertAdd";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage2 />} />
            <Route path="/connexion" element={<ConnectionPage />} />
            <Route path="/aboutPage" element={<AboutPage />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile/userid" element={<UserProfile />} />
              <Route path="/profile/useredit" element={<EditProfile />} />
              <Route path="/profile/userfavorite" element={<UserFavorite />} />
            </Route>
            <Route
              path="adminPanel"
              element={
                <AdminWall>
                  <AdminPanel />
                </AdminWall>
              }
            >
              <Route
                path="usersTable"
                element={
                  <AdminWall>
                    <DataTable />
                  </AdminWall>
                }
              />
              <Route
                path="videosTable"
                element={
                  <AdminWall>
                    <VideosManagement />
                  </AdminWall>
                }
              />
              <Route
                path="AdvertsTable"
                element={
                  <AdminWall>
                    <AdvertsManagement />
                  </AdminWall>
                }
              />
            </Route>
            <Route
              path="/videos/:id"
              element={
                <AdminWall>
                  <VideoUpdate />
                </AdminWall>
              }
            />
            <Route
              path="/advertManagementWindow"
              element={
                <AdminWall>
                  <AdvertAdd />
                </AdminWall>
              }
            />
            <Route
              path="/newVideo"
              element={
                <AdminWall>
                  <VideoAdd />
                </AdminWall>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
