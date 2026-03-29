import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl font-bold md:font-extrabold">AnantEats</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link to="/">Home</Link>
            {isAuthenticated && <Link to="/profile">Profile</Link>}
            {isAuthenticated && <Link to="/order/status">Order</Link>}

            {isAuthenticated && user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && (
              <Link to="/cart" className="relative cursor-pointer">
                <ShoppingCart />
                {cart.length > 0 && (
                  <Button
                    size="icon"
                    className="absolute -inset-y-3 left-2 h-4 w-4 rounded-full bg-red-500 text-xs hover:bg-red-500"
                  >
                    {cart.length}
                  </Button>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0).toUpperCase() || "AE"}
                  </AvatarFallback>
                </Avatar>

                {loading ? (
                  <Button className="bg-orange hover:bg-hoverOrange">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={logout}
                    className="bg-orange hover:bg-hoverOrange"
                  >
                    Logout
                  </Button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-orange hover:bg-hoverOrange">
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading, isAuthenticated } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size="18" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="mt-2 flex flex-row items-center justify-between">
          <SheetTitle>AnantEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2" />

        <SheetDescription className="flex-1">
          <SheetClose asChild>
            <Link
              to="/"
              className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
            >
              <User />
              <span>Home</span>
            </Link>
          </SheetClose>

          {isAuthenticated ? (
            <>
              <SheetClose asChild>
                <Link
                  to="/profile"
                  className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                >
                  <User />
                  <span>Profile</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/order/status"
                  className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                >
                  <HandPlatter />
                  <span>Order</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/cart"
                  className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                >
                  <ShoppingCart />
                  <span>Cart ({cart.length})</span>
                </Link>
              </SheetClose>

              {user?.admin && (
                <>
                  <SheetClose asChild>
                    <Link
                      to="/admin/menu"
                      className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                    >
                      <SquareMenu />
                      <span>Menu</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/admin/restaurant"
                      className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                    >
                      <UtensilsCrossed />
                      <span>Restaurant</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/admin/orders"
                      className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                    >
                      <PackageCheck />
                      <span>Restaurant Orders</span>
                    </Link>
                  </SheetClose>
                </>
              )}
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link
                  to="/login"
                  className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                >
                  <User />
                  <span>Login</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/signup"
                  className="flex items-center gap-4 rounded-lg px-3 py-2 font-medium hover:bg-gray-200 hover:text-gray-900"
                >
                  <User />
                  <span>Create account</span>
                </Link>
              </SheetClose>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0).toUpperCase() || "AE"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="font-bold">{user?.fullname || "AnantEats User"}</h1>
              </div>
              <SheetClose asChild>
                {loading ? (
                  <Button className="bg-orange hover:bg-hoverOrange">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={logout}
                    className="bg-orange hover:bg-hoverOrange"
                  >
                    Logout
                  </Button>
                )}
              </SheetClose>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Browse the homepage first, then login when you want to order.
              </p>
              <SheetClose asChild>
                <Link to="/login">
                  <Button className="bg-orange hover:bg-hoverOrange">
                    Login to continue
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
