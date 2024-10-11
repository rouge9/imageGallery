import { Routes, Route, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { Upload, Image, BarChart2, LogOut } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import ImageGallery from "@/components/ImageGallery";
import ImageAnalyzer from "@/components/ImageAnalyzer";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Image Gallery
          </h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Upload className="mr-3" size={20} />
            Image Uploader
          </Link>
          <Link
            to="/dashboard/gallery"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Image className="mr-3" size={20} />
            Image Gallery
          </Link>
          <Link
            to="/dashboard/analyzer"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <BarChart2 className="mr-3" size={20} />
            Image Analyzer
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<ImageUploader />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/analyzer" element={<ImageAnalyzer />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
