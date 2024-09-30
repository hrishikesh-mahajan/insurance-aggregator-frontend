"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider, DualSlider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Info,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const insurancePolicies = [
  {
    id: 1,
    provider: "ICICI Prudential",
    image: "ICICI_logo.webp",
    name: "iProtect Smart",
    link: "https://www.iciciprulife.com/term-insurance-plans/iprotect-smart-term-plan.html",
    claimSettled: 99.2,
    coverageTill: 60,
    lifeCover: 10000000,
    monthlyPremium: 2449,
    onlineSaving: 7.4,
    discount: "10% discount for salaried included (for 1st year)",
    freeAddOns: [
      {
        name: "Waiver of Premium Cover",
        price: "free",
        description:
          "Waives future premiums in case of total permanent disability or critical illness.",
      },
      {
        name: "100% payout on Terminal illness",
        price: "free",
        description:
          "Provides full sum assured payout if diagnosed with a terminal illness.",
      },
    ],
    paidAddOns: [
      {
        name: "Extra Payout on Accidental death",
        price: 58,
        description:
          "Provides additional payout in case of death due to accident.",
      },
      {
        name: "Cover against 34 critical illnesses",
        price: 330,
        description:
          "Offers protection against 34 specified critical illnesses.",
      },
    ],
    policyType: "term",
    minEntryAge: 18,
    maxEntryAge: 65,
    minCoverageAmount: 5000000,
    maxCoverageAmount: 100000000,
    minPolicyTerm: 5,
    maxPolicyTerm: 40,
    premiumPaymentOptions: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
    taxBenefits: "Premium paid is eligible for tax deduction under Section 80C",
    survivalBenefits: "No survival benefits as it's a pure term plan",
    maturityBenefits: "No maturity benefits",
    surrenderValue: "No surrender value",
    loanFacility: "No loan facility available",
    gracePeriod: "30 days for monthly mode, 15 days for other modes",
    revivalPeriod: "5 years from the date of first unpaid premium",
  },
  {
    id: 2,
    provider: "HDFC Life",
    image: "HDFC_Life_logo.avif",
    name: "Click 2 Protect Life",
    link: "https://www.hdfclife.com/term-insurance-plans/click-2-protect-life",
    claimSettled: 99.5,
    coverageTill: 65,
    lifeCover: 15000000,
    monthlyPremium: 3164,
    onlineSaving: 7.1,
    discount: "5% online discount included (for 1st year)",
    freeAddOns: [
      {
        name: "Accidental Death Benefit",
        price: "free",
        description: "Provides additional payout in case of accidental death.",
      },
    ],
    paidAddOns: [
      {
        name: "Critical Illness Rider",
        price: 420,
        description: "Covers 36 critical illnesses with additional payout.",
      },
    ],
    policyType: "term",
    minEntryAge: 18,
    maxEntryAge: 65,
    minCoverageAmount: 10000000,
    maxCoverageAmount: 150000000,
    minPolicyTerm: 10,
    maxPolicyTerm: 40,
    premiumPaymentOptions: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
    taxBenefits:
      "Premium paid is eligible for tax deduction under Section 80C and 10(10D)",
    survivalBenefits: "No survival benefits as it's a pure term plan",
    maturityBenefits: "Return of premiums at maturity (if opted)",
    surrenderValue: "Applicable only if Return of Premium option is chosen",
    loanFacility: "No loan facility available",
    gracePeriod: "30 days for all premium payment modes",
    revivalPeriod: "2 years from the date of first unpaid premium",
  },
  {
    id: 3,
    provider: "Max Life",
    image: "MAX_logo.avif",
    name: "Smart Secure Plus",
    link: "https://www.maxlifeinsurance.com/term-insurance-plans/smart-secure-plus-plan",
    claimSettled: 99.7,
    coverageTill: 70,
    lifeCover: 20000000,
    monthlyPremium: 2191,
    onlineSaving: 10.1,
    discount: "7% online discount included (for 1st year)",
    freeAddOns: [
      {
        name: "Terminal Illness Benefit",
        price: "free",
        description:
          "Provides full sum assured payout if diagnosed with a terminal illness.",
      },
    ],
    paidAddOns: [
      {
        name: "Accidental Death and Dismemberment Rider",
        price: 280,
        description:
          "Provides coverage for accidental death and dismemberment.",
      },
    ],
    policyType: "wholeLife",
    minEntryAge: 18,
    maxEntryAge: 60,
    minCoverageAmount: 10000000,
    maxCoverageAmount: 100000000,
    minPolicyTerm: "Whole life",
    maxPolicyTerm: "Whole life",
    premiumPaymentOptions: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
    taxBenefits:
      "Premium paid is eligible for tax deduction under Section 80C and 10(10D)",
    survivalBenefits:
      "Accumulation of bonuses (if any) throughout the policy term",
    maturityBenefits:
      "Sum assured plus accrued bonuses (if any) paid on maturity",
    surrenderValue: "Available after 3 full years' premiums are paid",
    loanFacility: "Available after 3 full years' premiums are paid",
    gracePeriod: "30 days for all premium payment modes",
    revivalPeriod: "5 years from the date of first unpaid premium",
  },
  {
    id: 4,
    provider: "TATA AIA",
    image: "TATA_AIA_logo.png",
    name: "Sampoorna Raksha+",
    link: "https://www.tataaia.com/life-insurance-plans/term-insurance/sampoorna-raksha.html",
    claimSettled: 99.1,
    coverageTill: 75,
    lifeCover: 25000000,
    monthlyPremium: 2229,
    onlineSaving: 7.3,
    discount: "10% discount for salaried included (for 1st year)",
    freeAddOns: [
      {
        name: "Life Stage Benefit",
        price: "free",
        description:
          "Allows increase in coverage at key life stages without medical tests.",
      },
      {
        name: "Special Exit Value",
        price: "free",
        description:
          "Returns a portion of premiums paid if the policy is surrendered after a certain period.",
      },
    ],
    paidAddOns: [],
    policyType: "endowment",
    minEntryAge: 18,
    maxEntryAge: 55,
    minCoverageAmount: 5000000,
    maxCoverageAmount: 50000000,
    minPolicyTerm: 15,
    maxPolicyTerm: 30,
    premiumPaymentOptions: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
    taxBenefits:
      "Premium paid is eligible for tax deduction under Section 80C and 10(10D)",
    survivalBenefits: "Guaranteed additions and reversionary bonuses (if any)",
    maturityBenefits: "Sum assured plus accrued bonuses paid on maturity",
    surrenderValue: "Available after 2 full years' premiums are paid",
    loanFacility: "Available after 2 full years' premiums are paid",
    gracePeriod: "15 days for monthly mode, 30 days for other modes",
    revivalPeriod: "2 years from the date of first unpaid premium",
  },
  {
    id: 5,
    provider: "SBI Life",
    image: "SBI_Life.svg",
    name: "eShield Next",
    link: "https://www.sbilife.co.in/en/online-insurance-plans/eshield-next",
    claimSettled: 98.8,
    coverageTill: 85,
    lifeCover: 30000000,
    monthlyPremium: 3500,
    onlineSaving: 8.5,
    discount: "8% discount for women policyholders",
    freeAddOns: [
      {
        name: "Spouse Insurance Cover",
        price: "free",
        description:
          "Provides additional coverage for the spouse at no extra cost.",
      },
    ],
    paidAddOns: [
      {
        name: "Income Benefit Rider",
        price: 550,
        description:
          "Provides regular income to the family in case of policyholder's death.",
      },
    ],
    policyType: "ulip",
    minEntryAge: 18,
    maxEntryAge: 65,
    minCoverageAmount: 10000000,
    maxCoverageAmount: 50000000,
    minPolicyTerm: 5,
    maxPolicyTerm: 30,
    premiumPaymentOptions: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
    taxBenefits:
      "Premium paid is eligible for tax deduction under Section 80C and 10(10D)",
    survivalBenefits: "Returns based on the performance of chosen fund options",
    maturityBenefits: "Fund value as on the date of maturity",
    surrenderValue: "Available after 5 year lock-in period",
    loanFacility: "Not available",
    gracePeriod: "15 days for monthly mode, 30 days for other modes",
    revivalPeriod: "2 years from the date of first unpaid premium",
  },
];

export default function LifeInsuranceSearchComponent() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [coverageAmount, setCoverageAmount] = useState([10000000]);
  const [policyTerm, setPolicyTerm] = useState([30]);
  const [policyTypes, setPolicyTypes] = useState<string[]>([]);
  const [premiumRange, setPremiumRange] = useState([0, 5000]);
  const [claimSettlementRatio, setClaimSettlementRatio] = useState([90]);
  const [sortBy, setSortBy] = useState("price-low");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPolicies, setSelectedPolicies] = useState<number[]>([]);
  const [expandedPolicies, setExpandedPolicies] = useState<Set<number>>(
    new Set(),
  );
  const { setTheme, theme } = useTheme();

  const filteredAndSortedPolicies = useMemo(() => {
    let filtered = insurancePolicies.filter(
      (policy) =>
        policy.lifeCover >= coverageAmount[0] &&
        policy.coverageTill >= policyTerm[0] &&
        (policyTypes.length === 0 || policyTypes.includes(policy.policyType)) &&
        policy.monthlyPremium >= premiumRange[0] &&
        policy.monthlyPremium <= premiumRange[1] &&
        policy.claimSettled >= claimSettlementRatio[0] &&
        (policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          policy.provider.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.monthlyPremium - b.monthlyPremium;
        case "price-high":
          return b.monthlyPremium - a.monthlyPremium;
        case "coverage":
          return b.lifeCover - a.lifeCover;
        case "claim-settlement":
          return b.claimSettled - a.claimSettled;
        default:
          return 0;
      }
    });
  }, [
    coverageAmount,
    policyTerm,
    policyTypes,
    premiumRange,
    claimSettlementRatio,
    sortBy,
    searchQuery,
  ]);

  const parentRef = React.useRef(null);
  const itemsRef = useRef<Record<number, HTMLDivElement | null>>({});

  const estimateSize = useCallback(
    (index: number) => {
      return expandedPolicies.has(index) ? 840 : 400;
    },
    [expandedPolicies],
  );
  const rowVirtualizer = useVirtualizer({
    count: filteredAndSortedPolicies.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5,
  });

  const toggleAddOns = useCallback((index: number) => {
    setExpandedPolicies((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [expandedPolicies, rowVirtualizer]);

  const togglePolicySelection = (policyId: number) => {
    setSelectedPolicies((prev) =>
      prev.includes(policyId)
        ? prev.filter((id) => id !== policyId)
        : [...prev, policyId],
    );
  };

  const togglePolicyType = (type: string) => {
    setPolicyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Life Insurance Search</h1>
          <div className="flex items-center space-x-2">
            <Input
              className="w-64 md:w-80"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row">
        <aside
          className={`space-y-6 md:w-64 ${
            isFilterOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="space-y-2">
              <Label>Coverage Amount</Label>
              <Slider
                value={coverageAmount}
                onValueChange={setCoverageAmount}
                max={50000000}
                step={1000000}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">
                ₹{(coverageAmount[0] / 10000000).toFixed(2)} Cr
              </div>
            </div>
            <div className="space-y-2">
              <Label>Policy Term</Label>
              <Slider
                value={policyTerm}
                onValueChange={setPolicyTerm}
                max={60}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">
                {policyTerm[0]} years
              </div>
            </div>
            <div className="space-y-2">
              <Label>Policy Type</Label>
              {["term", "wholeLife", "endowment", "ulip"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={policyTypes.includes(type)}
                    onCheckedChange={() => togglePolicyType(type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Monthly Premium Range</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={premiumRange[0]}
                  onChange={(e) =>
                    setPremiumRange([Number(e.target.value), premiumRange[1]])
                  }
                  className="w-20"
                />
                <Input
                  type="number"
                  value={premiumRange[1]}
                  onChange={(e) =>
                    setPremiumRange([premiumRange[0], Number(e.target.value)])
                  }
                  className="w-20"
                />
              </div>
              <DualSlider
                value={premiumRange}
                onValueChange={setPremiumRange}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Claim Settlement Ratio</Label>
              <Slider
                value={claimSettlementRatio}
                onValueChange={setClaimSettlementRatio}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">
                {claimSettlementRatio[0]}%
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="flex w-full items-center space-x-2 sm:w-auto">
              <Label htmlFor="sort" className="hidden sm:inline">
                Sort by:
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">
                    Premium: Low to High
                  </SelectItem>
                  <SelectItem value="price-high">
                    Premium: High to Low
                  </SelectItem>
                  <SelectItem value="coverage">Coverage Amount</SelectItem>
                  <SelectItem value="claim-settlement">
                    Claim Settlement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div ref={parentRef} className="h-[600px] overflow-auto">
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const policy = filteredAndSortedPolicies[virtualRow.index];
                return (
                  <div
                    key={policy.id}
                    ref={(el) => (itemsRef.current[virtualRow.index] = el)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Card className="mb-4 mr-6 overflow-hidden">
                      <CardHeader className="bg-muted">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={`/logos/${policy.image}`}
                              alt={`${policy.provider} logo`}
                              width={100}
                              height={50}
                              className="bg-background"
                            />
                            <div>
                              <CardTitle>{policy.name}</CardTitle>
                              <CardDescription>
                                {policy.provider}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => togglePolicySelection(policy.id)}
                          >
                            {selectedPolicies.includes(policy.id)
                              ? "Remove"
                              : "Compare"}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Claim settled
                            </p>
                            <p className="text-lg font-semibold">
                              {policy.claimSettled}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Coverage till
                            </p>
                            <p className="text-lg font-semibold">
                              {policy.coverageTill} Yrs
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Life cover
                            </p>
                            <p className="text-lg font-semibold">
                              ₹{(policy.lifeCover / 10000000).toFixed(2)} Cr
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              ₹{policy.monthlyPremium}
                              <span className="text-sm font-normal">
                                /month
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Online Saving ₹{policy.onlineSaving} K
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-green-600">
                            <Info className="mr-2 h-4 w-4" />
                            {policy.discount}
                          </div>
                          <div className="flex items-center text-sm">
                            <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                            24hr claim settlement
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-stretch bg-muted">
                        <Collapsible className="w-full">
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex w-full items-center justify-between p-0"
                              onClick={() => toggleAddOns(virtualRow.index)}
                            >
                              <span>
                                <span className="font-medium">
                                  {policy.freeAddOns.length} Free Add-ons
                                </span>
                                {policy.paidAddOns.length > 0 && (
                                  <span className="ml-2 text-xs text-muted-foreground">
                                    {policy.paidAddOns.length} Paid Add-ons
                                  </span>
                                )}
                              </span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </CollapsibleTrigger>
                          <AnimatePresence>
                            <CollapsibleContent asChild>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onAnimationComplete={() =>
                                  rowVirtualizer.measure()
                                }
                              >
                                <div className="mt-4 space-y-4">
                                  {policy.freeAddOns.length > 0 && (
                                    <div>
                                      <h4 className="mb-2 font-semibold">
                                        Free Add-ons
                                      </h4>
                                      <ul className="space-y-1">
                                        {policy.freeAddOns.map((addon, idx) => (
                                          <li
                                            key={idx}
                                            className="flex justify-between text-sm"
                                          >
                                            <span>{addon.name}</span>
                                            <TooltipProvider>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-0"
                                                  >
                                                    <HelpCircle className="h-4 w-4" />
                                                  </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>{addon.description}</p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {policy.paidAddOns.length > 0 && (
                                    <div>
                                      <h4 className="mb-2 font-semibold">
                                        Paid Add-ons
                                      </h4>
                                      <ul className="space-y-1">
                                        {policy.paidAddOns.map((addon, idx) => (
                                          <li
                                            key={idx}
                                            className="flex justify-between text-sm"
                                          >
                                            <span>{addon.name}</span>
                                            <span className="flex items-center">
                                              ₹{addon.price}
                                              <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="ml-2 p-0"
                                                    >
                                                      <HelpCircle className="h-4 w-4" />
                                                    </Button>
                                                  </TooltipTrigger>
                                                  <TooltipContent>
                                                    <p>{addon.description}</p>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-4 space-y-2 text-sm">
                                  <p>
                                    <strong>Entry Age:</strong>{" "}
                                    {policy.minEntryAge} - {policy.maxEntryAge}{" "}
                                    years
                                  </p>
                                  <p>
                                    <strong>Coverage Amount:</strong> ₹
                                    {(
                                      policy.minCoverageAmount / 10000000
                                    ).toFixed(2)}{" "}
                                    Cr - ₹
                                    {(
                                      policy.maxCoverageAmount / 10000000
                                    ).toFixed(2)}{" "}
                                    Cr
                                  </p>
                                  <p>
                                    <strong>Policy Term:</strong>{" "}
                                    {policy.minPolicyTerm} -{" "}
                                    {policy.maxPolicyTerm} years
                                  </p>
                                  <p>
                                    <strong>Premium Payment Options:</strong>{" "}
                                    {policy.premiumPaymentOptions.join(", ")}
                                  </p>
                                  <p>
                                    <strong>Tax Benefits:</strong>{" "}
                                    {policy.taxBenefits}
                                  </p>
                                  <p>
                                    <strong>Survival Benefits:</strong>{" "}
                                    {policy.survivalBenefits}
                                  </p>
                                  <p>
                                    <strong>Maturity Benefits:</strong>{" "}
                                    {policy.maturityBenefits}
                                  </p>
                                  <p>
                                    <strong>Surrender Value:</strong>{" "}
                                    {policy.surrenderValue}
                                  </p>
                                  <p>
                                    <strong>Loan Facility:</strong>{" "}
                                    {policy.loanFacility}
                                  </p>
                                  <p>
                                    <strong>Grace Period:</strong>{" "}
                                    {policy.gracePeriod}
                                  </p>
                                  <p>
                                    <strong>Revival Period:</strong>{" "}
                                    {policy.revivalPeriod}
                                  </p>
                                </div>
                              </motion.div>
                            </CollapsibleContent>
                          </AnimatePresence>
                        </Collapsible>
                        <Link href={policy.link} target="_blank">
                          <Button className="mt-4 w-full">View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      {selectedPolicies.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
          <div className="container mx-auto flex items-center justify-between">
            <p>{selectedPolicies.length} policies selected for comparison</p>
            <Button>Compare Selected Policies</Button>
          </div>
        </div>
      )}
    </div>
  );
}
