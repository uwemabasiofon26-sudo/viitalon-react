import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-av-gold mb-3">Stay In The Loop</p>
      <h3 className="font-display text-2xl md:text-3xl font-bold text-av-alloy mb-3">
        Subscribe to our newsletter
      </h3>
      <p className="text-sm text-av-alloy/60 max-w-md mx-auto mb-6">
        Get product drops, training insights and subscriber-only offers straight to your inbox.
      </p>
      {done ? (
        <div className="inline-flex items-center gap-2 text-av-gold font-semibold">
          <Check className="h-5 w-5" /> You're subscribed — check your inbox.
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-end gap-3 max-w-md mx-auto">
          <div className="flex-1 text-left">
            <label
              htmlFor="newsletter-email"
              className="block text-[11px] uppercase tracking-[0.2em] text-av-alloy/60 mb-2"
            >
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-av-teal rounded-full px-5 py-3 text-av-alloy placeholder:text-av-alloy/40 focus:border-av-gold outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-av-gold text-av-deep px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition shrink-0 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      )}
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}
