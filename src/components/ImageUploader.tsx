import React, { useState } from "react";
import { supabase } from "../supabase";
import { Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { analyzeImage } from "@/services/ImageAnalyze";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const url = supabase.storage.from("images").getPublicUrl(filePath);

      // const {
      //   data: { publicUrl },
      // } = supabase.storage.from("images").getPublicUrl(filePath);

      const analysis = await analyzeImage(url.data.publicUrl);
      console.log(analysis);

      const { error: insertError } = await supabase.from("images").insert({
        user_id: user.id,
        file_path: filePath,
        analysis: analysis || "",
      });

      if (insertError) throw insertError;

      setFile(null);
      alert(
        "Image uploaded and analyzed successfully! check your image gallery"
      );
    } catch (error) {
      setError("Error uploading image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  console.log(error);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Select an image to upload
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <Upload className="mr-2" size={20} />
            Upload Image
          </>
        )}
      </button>
    </div>
  );
};

export default ImageUploader;
