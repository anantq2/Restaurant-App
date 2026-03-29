import { Link } from "react-router-dom";
import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "./ui/button";

const popularLinks = [
  { label: "Biryani", to: "/search/Biryani" },
  { label: "Pizza", to: "/search/Pizza" },
  { label: "Desserts", to: "/search/Desserts" },
];

const Footer = () => {
  const { isAuthenticated, user } = useUserStore();
  const currentYear = new Date().getFullYear();

  const accountLinks = isAuthenticated
    ? [
        { label: "Profile", to: "/profile" },
        { label: "Orders", to: "/order/status" },
        { label: "Cart", to: "/cart" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Create account", to: "/signup" },
        { label: "Browse home", to: "/" },
      ];

  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-orange">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/60">
                AnantEats
              </p>
            </div>

            <h2 className="mt-5 max-w-lg text-3xl font-black tracking-tight">
              Cleaner discovery, faster cravings, better-looking screens.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              Browse restaurants, jump into trending cravings, and move to
              checkout with less clutter and better flow.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/search/Pizza">
                <Button className="rounded-2xl bg-orange px-6 hover:bg-hoverOrange">
                  Explore food
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/profile" : "/login"}>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  {isAuthenticated ? "Open profile" : "Login to continue"}
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex items-center gap-3 text-orange">
              <Compass className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Explore</h3>
            </div>
            <div className="space-y-3">
              {popularLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/75 transition-colors hover:border-orange/30 hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex items-center gap-3 text-orange">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Account</h3>
            </div>
            <div className="space-y-3">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/75 transition-colors hover:border-orange/30 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Status
              </p>
              <p className="mt-2 text-sm text-white/75">
                {isAuthenticated
                  ? `Signed in as ${user?.fullname || "AnantEats user"}`
                  : "Guest browsing mode enabled"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} AnantEats. All rights reserved.</p>
          <p>Designed to feel faster, clearer, and more intentional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
