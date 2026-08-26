import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../../api/PocketBase";
import { UI_CLASSES } from "../../assets/const";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection("users").authWithPassword(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className={UI_CLASSES.section + " flex items-center justify-center bg-zinc-950"}>
      <div className={`max-w-md w-full p-8 rounded-2xl ${UI_CLASSES.cardBase} ${UI_CLASSES.cardDefault} space-y-8`}>
        <div className={UI_CLASSES.headingCenter}>
          <h2 className={UI_CLASSES.title + " text-2xl md:text-3xl"}>
            Панель управления
          </h2>
          <p className={UI_CLASSES.subtitle + " text-sm"}>
            Войдите в свой аккаунт
          </p>
        </div>

        {error && (
          <div className="bg-red-950/50 border-l-4 border-red-500 p-4 rounded-xl">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`${UI_CLASSES.buttonBase} ${UI_CLASSES.buttonPrimary}`}
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}