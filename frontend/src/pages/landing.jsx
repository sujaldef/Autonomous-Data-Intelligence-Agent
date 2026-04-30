const Landing = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          ADIA
        </p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
          A simple landing page for your app.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          This is the basic home route for ADIA. Use it as a starting point for
          your product, and jump to the login or signup screen when you need
          access.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#/auth"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Go to Login / Sign Up
          </a>
          <span className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200">
            Basic routing ready
          </span>
        </div>
      </section>
    </main>
  );
};

export default Landing;
