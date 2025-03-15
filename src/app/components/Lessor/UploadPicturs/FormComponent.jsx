import Header from "./Header";
import UploadArea from "./UploadArea";
import PhotoGallery from "./PhotoGallery";

export default function Component() {
  return (
    <article className="h-svh w-screen px-4 py-8 bg-slate-600">
      <Header />
      <UploadArea />
      <PhotoGallery />
    </article>
  );
}
