import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  ChefHat,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const quickSearches = [
  "Biryani",
  "Pizza",
  "Momos",
  "Desserts",
  "Rolls",
];

const promiseCards = [
  {
    title: "Fast from nearby kitchens",
    description:
      "Smart restaurant discovery helps you reach the good stuff before the hunger gets dramatic.",
    icon: Clock3,
  },
  {
    title: "Menus worth tapping",
    description:
      "From comfort classics to snack attacks, the browsing flow feels curated instead of crowded.",
    icon: ChefHat,
  },
  {
    title: "Checkout without friction",
    description:
      "Simple flow, secure payment, clear tracking, and fewer clicks between craving and doorbell.",
    icon: ShieldCheck,
  },
];

const tasteBoards = [
  {
    title: "Late-night comfort",
    blurb: "Momos, fries, wraps and all the quick fixes that hit at 11:47 PM.",
    query: "Momos",
    accent: "from-orange/20 via-orange/10 to-transparent",
  },
  {
    title: "Weekend indulgence",
    blurb: "Cheesy slices, loaded burgers and plates you absolutely should not share.",
    query: "Pizza",
    accent: "from-amber-300/25 via-orange/10 to-transparent",
  },
  {
    title: "Fresh and balanced",
    blurb: "Bowls, grills and lighter meals when you want energy without the food coma.",
    query: "Healthy food",
    accent: "from-emerald-300/25 via-lime-200/10 to-transparent",
  },
  {
    title: "Sweet finish",
    blurb: "Brownies, kulfi, pastries and sugar therapy with zero judgement.",
    query: "Desserts",
    accent: "from-rose-300/25 via-pink-200/10 to-transparent",
  },
];

const HereSection = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  const firstName = user?.fullname?.split(" ")[0] || "Foodie";
  const isAdmin = Boolean(isAuthenticated && user?.admin);
  const profileTarget = !isAuthenticated
    ? "/login"
    : isAdmin
      ? "/admin/restaurant"
      : "/profile";
  const profileLabel = !isAuthenticated
    ? "Login to Order"
    : isAdmin
      ? "Open Dashboard"
      : "Edit Profile";
  const eyebrowLabel = isAuthenticated
    ? `Welcome back, ${firstName}`
    : "Fresh delivery experience";

  const handleSearch = (value: string) => {
    const query = value.trim();
    if (!query) {
      return;
    }

    navigate(`/search/${encodeURIComponent(query)}`);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchText);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-orange/10 via-orange/5 to-transparent dark:from-orange/10 dark:via-orange/5" />
      <div className="absolute left-[-5rem] top-16 h-64 w-64 rounded-full bg-orange/20 blur-3xl dark:bg-orange/10" />
      <div className="absolute right-[-4rem] top-24 h-80 w-80 rounded-full bg-zinc-900/10 blur-3xl dark:bg-white/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 md:py-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <Badge
              variant="outline"
              className="rounded-full border-orange/30 bg-white/80 px-4 py-1 text-sm text-orange shadow-sm backdrop-blur dark:bg-zinc-950/60"
            >
              Built for cravings, quick routes, and cleaner screens
            </Badge>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                {eyebrowLabel}
              </p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white md:text-6xl">
                Good food deserves a homepage that feels hungry.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 md:text-lg">
                Search fast, discover better kitchens, and move from
                &nbsp;"kya khaayein?" to checkout without wading through boring
                cards. AnantEats is now tuned for appetite and speed.
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="rounded-[28px] border border-white/70 bg-white/85 p-3 shadow-[0_25px_80px_-30px_rgba(209,146,84,0.55)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/70"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <Input
                    type="text"
                    value={searchText}
                    placeholder="Search biryani, pizza, desserts, your city..."
                    onChange={(event) => setSearchText(event.target.value)}
                    className="h-14 rounded-2xl border-zinc-200 bg-white pl-12 text-base shadow-none dark:border-zinc-800 dark:bg-zinc-900"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="h-14 rounded-2xl bg-orange px-6 text-base hover:bg-hoverOrange"
                    disabled={!searchText.trim()}
                  >
                    Search Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(profileTarget)}
                    className="h-14 rounded-2xl border-zinc-200 px-6 text-base dark:border-zinc-800"
                  >
                    {profileLabel}
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap gap-3">
              {quickSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSearch(item)}
                  className="rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/40 hover:text-orange dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/60 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <Bike className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white">
                  Fast lanes
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Delivery-focused search made for quick choices.
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white">
                  Nearby picks
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Search by restaurant name, city, or country in one move.
                </p>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-950 dark:text-white">
                  Better browsing
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Cleaner cards and stronger visual hierarchy end-to-end.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-5 shadow-[0_30px_100px_-35px_rgba(17,24,39,0.45)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/70 md:p-6">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-orange/20 bg-orange/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-zinc-950/5 blur-3xl dark:bg-white/5" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full bg-zinc-950 px-4 py-1 text-white hover:bg-zinc-950 dark:bg-white dark:text-zinc-950">
                    Tonight&apos;s moodboard
                  </Badge>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Freshly arranged
                  </p>
                </div>

                <div className="rounded-[28px] bg-zinc-950 p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-white/60">
                        Headliner
                      </p>
                      <h2 className="mt-3 text-3xl font-bold leading-tight">
                        Paneer Tikka Bowl
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                        Smoky, saucy and deeply comforting. The kind of order
                        you place once and then keep chasing every week.
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange">
                      <Sparkles className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                      24 min route
                    </Badge>
                    <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                      Top-rated comfort
                    </Badge>
                    <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                      Repeat-order energy
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                      <UtensilsCrossed className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                      Curated kitchens
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      Discover menus that feel selected, not dumped into a feed.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                      <ChefHat className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                      Flavor-first menus
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      Rich categories, cleaner browsing, and faster tap-to-cart.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-orange/15 via-orange/5 to-transparent p-5 dark:border-zinc-800">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                      Routing feel
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      <span className="text-4xl font-black text-zinc-950 dark:text-white">
                        24
                      </span>
                      <span className="pb-1 text-sm text-zinc-500 dark:text-zinc-400">
                        mins avg. comfort order
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                      Trust
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-zinc-950 dark:text-white">
                      <ShieldCheck className="h-5 w-5 text-orange" />
                      <span className="font-semibold">Safer checkout flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {promiseCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[28px] border border-zinc-200 bg-white/85 p-6 transition-transform duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-950/70"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-5">
            <Badge
              variant="outline"
              className="rounded-full border-orange/30 bg-white/80 px-4 py-1 text-sm text-orange dark:bg-zinc-950/60"
            >
              Browse by craving
            </Badge>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white md:text-5xl">
              Choose a mood, not just a menu.
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Some nights you want loaded comfort, some days you want clean
              bowls, and sometimes the answer is simply dessert. Start with the
              feeling and let the search page do the rest.
            </p>
            <Button
              onClick={() => handleSearch("Top rated restaurants")}
              className="rounded-2xl bg-orange px-6 py-6 text-base hover:bg-hoverOrange"
            >
              Explore Popular Searches
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tasteBoards.map((board) => (
              <button
                key={board.title}
                type="button"
                onClick={() => handleSearch(board.query)}
                className={`overflow-hidden rounded-[30px] border border-zinc-200 bg-gradient-to-br ${board.accent} p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 dark:border-zinc-800`}
              >
                <div className="flex h-full flex-col justify-between gap-12">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-orange shadow-sm dark:bg-zinc-950/70">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-500 dark:text-zinc-300" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                      {board.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {board.blurb}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[36px] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-[0_30px_100px_-35px_rgba(17,24,39,0.75)] dark:border-white/10 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
                Final nudge
              </p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Hungry right now? Start where your craving already knows the answer.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                Jump into a search, revisit your profile, or head into the
                dashboard if you&apos;re running a kitchen. The homepage is now
                built to get you moving, not slow you down.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => handleSearch(searchText || "Pizza")}
                className="h-14 rounded-2xl bg-orange px-6 text-base hover:bg-hoverOrange"
              >
                Find Food
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(profileTarget)}
                className="h-14 rounded-2xl border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                {profileLabel}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HereSection;
