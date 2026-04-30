const LoginSignup = () => {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            ADIA Access
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Login / Sign Up
          </h1>
          <p className="mt-4 max-w-md text-slate-300">
            A basic auth page for signing in or creating an account. This is
            intentionally simple and ready for you to connect to a backend
            later.
          </p>

          <a
            href="#/"
            className="mt-8 inline-flex rounded-full border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Back to Landing
          </a>
        </div>

        <div className="grid gap-6">
          <form className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
            <h2 className="text-2xl font-bold">Login</h2>
            <div className="mt-6 space-y-4 text-left">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>
              <button className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">
                Sign In
              </button>
            </div>
          </form>

          <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <div className="mt-6 space-y-4 text-left">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-400"
                />
              </label>
              <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginSignup;
