import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const quickSearches = ["Biryani", "Pizza", "Momos", "Desserts"];

const trustPoints = [
  {
    title: "Search anything",
    description: "Dish, cuisine, restaurant, or city - start wherever your craving starts.",
    icon: Search,
  },
  {
    title: "Browse before login",
    description: "Guests can explore restaurants first and sign in only when they are ready.",
    icon: MapPin,
  },
  {
    title: "Easy follow-through",
    description: "Profile, cart, and order status stay close when you want to move fast.",
    icon: ShieldCheck,
  },
];

const quickStartItems = [
  {
    title: "Lunch in a hurry",
    description: "Go straight to biryani, rolls, thalis, and filling weekday picks.",
    query: "Biryani",
    icon: Clock3,
  },
  {
    title: "Snack break",
    description: "Pizza, momos, fries, and comfort bites for a quick reset.",
    query: "Momos",
    icon: ChefHat,
  },
  {
    title: "Something sweet",
    description: "Desserts and late cravings when the meal needs a proper finish.",
    query: "Desserts",
    icon: Sparkles,
  },
];

const curatedBoards = [
  {
    label: "Comfort picks",
    title: "Late-night cravings",
    blurb: "Momos, wraps, fries, and warm comfort food when you want something easy.",
    query: "Momos",
  },
  {
    label: "Crowd favorite",
    title: "Weekend pizza run",
    blurb: "Cheesy slices, loaded sides, and shareable picks for laid-back plans.",
    query: "Pizza",
  },
  {
    label: "Sweet stop",
    title: "Dessert run",
    blurb: "Cakes, brownies, kulfi, and post-meal cravings that deserve their own order.",
    query: "Desserts",
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
  const secondaryTarget = !isAuthenticated
    ? "/login"
    : isAdmin
      ? "/admin/restaurant"
      : "/profile";
  const secondaryLabel = !isAuthenticated
    ? "Login to Order"
    : isAdmin
      ? "Open Dashboard"
      : "Open Profile";
  const eyebrowLabel = isAuthenticated
    ? `Welcome back, ${firstName}`
    : "Find your next order";

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
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-orange/10 via-orange/5 to-transparent dark:from-orange/12 dark:via-orange/5" />
      <div className="absolute left-[-4rem] top-16 h-56 w-56 rounded-full bg-orange/20 blur-3xl dark:bg-orange/10" />
      <div className="absolute right-[-4rem] top-20 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl dark:bg-white/5" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 md:py-14">
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-7">
            <Badge
              variant="outline"
              className="rounded-full border-orange/30 bg-white/80 px-4 py-1 text-sm text-orange shadow-sm backdrop-blur dark:bg-zinc-950/60"
            >
              Fast, no-fuss ordering
            </Badge>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange/80 dark:text-orange/70">
                {eyebrowLabel}
              </p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white md:text-6xl">
                What are you craving today?
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 md:text-lg">
                Search dishes, cuisines, restaurants, or your city and jump
                straight into menus that match.
              </p>
            </div>

            <form
              onSubmit={submitHandler}
              className="rounded-[28px] border border-white/70 bg-white/85 p-3 shadow-[0_24px_70px_-34px_rgba(209,146,84,0.55)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/70"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <Input
                    type="text"
                    value={searchText}
                    placeholder="Try biryani, pizza, momos, desserts..."
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
                    Search Food
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(secondaryTarget)}
                    className="h-14 rounded-2xl border-zinc-200 px-6 text-base dark:border-zinc-800"
                  >
                    {secondaryLabel}
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
                  className="rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-orange/40 hover:text-orange dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_28px_80px_-36px_rgba(17,24,39,0.45)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
            <div className="space-y-6">
              <Badge className="rounded-full bg-zinc-950 px-4 py-1 text-white hover:bg-zinc-950 dark:bg-white dark:text-zinc-950">
                Quick start
              </Badge>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Skip the scroll. Start with a lane.
                </h2>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  Use one of these popular routes and get into the food you
                  actually want faster.
                </p>
              </div>

              <div className="space-y-3">
                {quickStartItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSearch(item.query)}
                      className="w-full rounded-[24px] border border-zinc-200 bg-zinc-50 p-5 text-left transition-colors hover:border-orange/40 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-950"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-5 w-5 text-zinc-400" />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-gradient-to-r from-orange/10 via-orange/5 to-transparent p-5 dark:border-zinc-800">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-orange" />
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                      Browse first, login later
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      You can explore restaurants and menus before signing in to
                      place an order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[36px] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_-48px_rgba(17,24,39,0.45)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/55 md:p-8">
          <div className="space-y-3">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-orange/30 bg-white/80 px-4 py-1 text-sm text-orange dark:bg-zinc-950/60"
              >
                Popular cravings
              </Badge>
              <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white md:text-5xl">
                Start with something reliable.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                These are easy entry points when you are hungry and do not want
                to overthink the search.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {curatedBoards.map((board) => (
              <button
                key={board.title}
                type="button"
                onClick={() => handleSearch(board.query)}
                className="rounded-[28px] border border-zinc-200 bg-white/85 p-6 text-left transition-colors hover:border-orange/40 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/70 dark:hover:bg-zinc-950"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                  {board.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-white">
                  {board.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {board.blurb}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-orange">
                  Search {board.query}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HereSection;
