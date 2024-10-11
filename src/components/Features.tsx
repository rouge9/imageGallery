import { Button } from "./ui/button";

export default function Features() {
  return (
    <div>
      <section className="text-center mb-20 pt-20 md:px-20">
        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-xl text-gray-600 mb-12">Let's Change Your Mind</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              number: 1,
              title: "Fast Uploads",
              description:
                "Drag-and-drop your files for quick and easy uploading.",
            },
            {
              number: 2,
              title: "Organize with Ease",
              description:
                "Create albums, tag images, and search through your collection effortlessly.",
            },
            {
              number: 3,
              title: "AI Insights",
              description:
                "Curious about the content of your images? Our AI can analyze and provide",
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {step.number === 1 && (
                <img
                  src="/assets/img/feature-1.svg"
                  alt="QR Code"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              )}
              {step.number === 2 && (
                <img
                  src="/assets/img/feature-2.svg"
                  alt="Send a message"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              )}
              {step.number === 3 && (
                <img
                  src="/assets/img/feature-3.svg"
                  alt="Follow-up from your inbox"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              )}
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center">
        <Button
          size="lg"
          className="text-lg px-12 py-8 rounded-full font-semibold hover:bg-red-200"
        >
          <a href="/dashboard"> Start Uploading</a>
        </Button>
      </section>
    </div>
  );
}
