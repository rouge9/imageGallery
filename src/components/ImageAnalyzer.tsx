import { useState } from "react";
import { supabase } from "../supabase";
import { BarChart2 } from "lucide-react";

const ImageAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const analyzeImages = async () => {
    setAnalyzing(true);
    setResult(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.storage
        .from("images")
        .list(user.id);

      if (error) throw error;

      const totalImages = data.length;
      const totalSize = data.reduce((acc, file) => acc + file.metadata.size, 0);
      const averageSize = totalSize / totalImages;

      setResult(`
        Total images: ${totalImages}
        Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB
        Average size: ${(averageSize / 1024 / 1024).toFixed(2)} MB
      `);
    } catch (error) {
      console.error("Error analyzing images:", error);
      alert("Error analyzing images. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Image Analyzer</h2>
      <button
        onClick={analyzeImages}
        disabled={analyzing}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      >
        {analyzing ? (
          "Analyzing..."
        ) : (
          <>
            <BarChart2 className="mr-2" size={20} />
            Analyze Images
          </>
        )}
      </button>
      {result && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
