import UploadIcon from "./UploadIcon";

export default function UploadArea() {
  return (
    <article className="flex justify-center items-center">
      <article className="bg-card rounded-lg border border-input p-6 mb-6 w-full max-w-7xl">
        <article className="flex flex-col items-center justify-center h-30 border-2 border-dashed py-8 rounded-md">
          <UploadIcon className="w-10 h-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            Select the photos you want to upload
          </p>
        </article>
      </article>
    </article>
  );
}
