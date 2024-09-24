"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";

const insuranceProducts = [
  {
    title: "Term Life Insurance",
    icon: "🌂",
    discount: "Upto 10% Discount",
    route: "search",
  },
  {
    title: "Health Insurance",
    icon: "❤️",
    feature: "Cashless Anywherev",
    route: "search",
  },
  {
    title: "Investment Plans",
    icon: "💰",
    feature: "In-built Life Cover",
    route: "sewrch",
  },
  {
    title: "Car Insurance",
    icon: "🚗",
    discount: "Upto 85% Discount",
    route: "",
  },
  { title: "2 Wheeler Insurance", icon: "🛵", feature: "", route: "" },
  {
    title: "Family Health Insurance",
    icon: "👨‍👩‍👧‍👦",
    discount: "Upto 25% Discount",
    route: "",
  },
  { title: "Travel Insurance", icon: "✈️", feature: "", route: "" },
  {
    title: "Term Insurance (Women)",
    icon: "👩",
    discount: "Upto 20% Cheaper",
    route: "",
  },
];

const accentColors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export default function Home() {
  const { setTheme, theme } = useTheme();
  const [accent, setAccent] = React.useState("blue");

  React.useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.startsWith("accent-")) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(`accent-${accent}`);
  }, [accent]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="ml-4 flex gap-6 md:gap-10">
            <a className="flex items-center space-x-2" href="/">
              <span className="inline-block font-bold">
                InsuranceAggregator
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="mr-4 flex items-center space-x-1">
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
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Accent Color</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {accentColors.map((color) => (
                    <DropdownMenuItem
                      key={color}
                      onClick={() => setAccent(color)}
                    >
                      {color}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Find the Best Insurance</h1>
          <p className="text-xl text-muted-foreground">
            Compare and choose from 50+ top insurers
          </p>
        </section>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {insuranceProducts.map((product, index) => (
            <Link
              className="rounded-xl border-4 border-transparent hover:scale-105 hover:border-blue-600"
              href={product.route}
            >
              <Card className="w-50 h-40" key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="mr-2 text-2xl">{product.icon}</span>
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {product.discount && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {product.discount}
                    </p>
                  )}
                  {product.feature && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {product.feature}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
