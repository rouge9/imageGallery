import { useEffect, useState } from "react";
import { supabase } from "../supabase";

interface Image {
  name: string;
  url: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.storage
        .from("images")
        .list(user.id);

      if (error) throw error;

      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("images")
            .getPublicUrl(`${user.id}/${file.name}`);
          return { name: file.name, url: publicUrl };
        })
      );

      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.name}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600 truncate">{image.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
