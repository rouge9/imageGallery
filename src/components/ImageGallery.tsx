import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface Image {
  id: number;
  file_path: string;
  analysis: string;
  uploaded_at: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("user_id", user?.id)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteImage = async (id: number, filePath: string) => {
    try {
      await supabase.storage.from("images").remove([filePath]);
      await supabase.from("images").delete().eq("id", id);
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Images</h2>
      {loading ? <p>Loading...</p> : null}
      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  supabase.storage.from("images").getPublicUrl(image.file_path)
                    .data.publicUrl
                }
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">
                  Uploaded on {new Date(image.uploaded_at).toLocaleDateString()}
                </p>
                <p className="text-sm mb-4">Ai Gen: {image.analysis}</p>
                <button
                  // onClick={() => deleteImage(image.id, image.file_path)}
                  onClick={() => setShowModal(true)}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        deleteImage(image.id, image.file_path);
                        setShowModal(false);
                      }}
                      className="bg-red-400 rounded-full"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => setShowModal(false)}
                      className="bg-amber-400 rounded-full"
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
