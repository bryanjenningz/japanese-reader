import Link from "next/link";
import { ArrowBackIcon } from "~/icons/ArrowBackIcon";

export default function History() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <header className="fixed left-0 right-0 top-0 flex h-12 w-full items-center justify-center bg-inherit">
        <div className="flex h-full w-full max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center"
            title="Go back"
          >
            <ArrowBackIcon />
          </Link>

          <h1 className="grow px-4 text-lg font-bold">History</h1>

          <button className="flex h-12 w-fit items-center justify-center px-2 text-sm  uppercase">
            Clear all
          </button>
        </div>
      </header>
    </main>
  );
}
