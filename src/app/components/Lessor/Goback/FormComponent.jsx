import BackButton from "./BackButton";
import PageTitle from "./PageTitle";

export default function Component() {
  return (
    <header className="bg-slate-800 fixed w-full flex items-center justify-between bg-background px-6 py-3 shadow-sm">
      <BackButton />
      <PageTitle title="Page Title" />
    </header>
  );
}
