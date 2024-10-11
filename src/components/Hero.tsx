import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="text-center mt-10 md:mt-20 mb-20 md:py-12 flex flex-col justify-center items-center">
      <h1 className="text-5xl md:text-7xl mb-6 max-w-xl font-extrabold leading-none tracking-tight text-primary-900">
        IMAGE GALLERY
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
        Discover a seamless way to upload, store, and analyze your images with
        our innovative platform. Whether you're a photographer, designer, or
        simply someone who loves capturing moments, the platform offers the
        tools you need to manage your image collection with ease.
      </p>
      <Button
        size="lg"
        className="text-lg px-12 py-8 rounded-full font-semibold hover:bg-teal-500"
      >
        <a href="/signup"> Sign up free</a>
      </Button>
    </section>
  );
}
