import { Link } from 'react-router-dom';

const LoginSignup = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-6 py-12 text-slate-100">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-5xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.82)] p-8 text-white shadow-2xl shadow-slate-950/40 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            ADIA Access
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Login / Sign Up
          </h1>
          <p className="mt-4 max-w-md text-slate-300">
            Use the dark workspace to sign in or create an account. The forms
            are intentionally minimal so the app feels calm and consistent.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Back to Landing
          </Link>
        </div>

        <div className="grid gap-6">
          <form className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.82)] p-8 shadow-xl shadow-slate-950/40 backdrop-blur">
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <div className="mt-6 space-y-4 text-left">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>
              <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Sign In
              </button>
            </div>
          </form>

          <form className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.82)] p-8 shadow-lg shadow-slate-950/40 backdrop-blur">
            <h2 className="text-2xl font-bold text-white">Sign Up</h2>
            <div className="mt-6 space-y-4 text-left">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>
              <button className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
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
