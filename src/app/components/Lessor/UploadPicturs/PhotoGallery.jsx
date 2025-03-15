export default function PhotoGallery() {
  const photos = [
    {
      src: "../../Fotografias/habitacion.jpg",
      alt: "Photo 1",
      title: "Photo 1",
      description: "This is the description of photo 1.",
    },
    {
      src: "../../Fotografias/habitacion.jpg",
      alt: "Photo 2",
      title: "Photo 2",
      description: "This is the description of photo 2.",
    },
    {
      src: "../../Fotografias/habitacion.jpg",
      alt: "Photo 3",
      title: "Photo 3",
      description: "This is the description of photo 3.",
    },
  ];

  return (
    <article className="flex justify-center items-center px-4">
      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <article key={index} className="bg-card overflow-hidden">
            <img
              src={photo.src}
              alt={photo.alt}
              className="rounded object-cover"
            />
            <article className="p-4">
              <h3 className="text-lg font-medium mb-1">{photo.title}</h3>
              <p className="text-muted-foreground">{photo.description}</p>
            </article>
          </article>
        ))}
      </article>
    </article>
  );
}
