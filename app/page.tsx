export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-blue-900">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-blue-900 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className=" text-100xl items-center font-bold text-black dark:text-white sm:text-5xl">
            WELCOME TO THE LIVE CHAT APP!
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-white/80">
            Looking for a way to chat with your friends? Youre at the right place.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        </div>
      </main>
    </div>
  );
}
