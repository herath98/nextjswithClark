"use client";
import ApexCharts from "apexcharts";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import LineChart1 from "@/components/LineChart";
import ColumnChart1 from "@/components/ColumnChart";
import BarChart from "@/components/BarChart";
import SalsChar from "@/components/LabelsChart";
import SalsChar2 from "@/components/Sales";
import ProductChar from "@/components/ProductChar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreateOrganization,
  RedirectToUserProfile,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
  VictoryStack,
  VictoryArea,
  VictoryLine,
} from "victory";
import { Dropdown,Modal } from "flowbite-react";

export default function Page() {
  const { setTheme } = useTheme();
  const [openModal, setOpenModal] = useState(true);
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  const [isClicksPopoverVisible, setIsClicksPopoverVisible] = useState(false);
  const [isCpcPopoverVisible, setIsCpcPopoverVisible] = useState(false);

  const handleMouseEnterClicks = () => {
    setIsClicksPopoverVisible(true);
  };

  const handleMouseLeaveClicks = () => {
    setIsClicksPopoverVisible(false);
  };

  const handleMouseEnterCpc = () => {
    setIsCpcPopoverVisible(true);
  };

  const handleMouseLeaveCpc = () => {
    setIsCpcPopoverVisible(false);
  };

  return (
    <main className="w-full">
      <SignedOut>
        <div className="grid lg:mx-32 mx-5 md:mx-10   justify-center grid-cols-1 gap-10 mt-20 md:grid-cols-2">
          <div className="max-w-7xl px-5 my-auto">
            <img src="/logo2.png" alt="" />
          </div>
          <div className="my-auto">
            <h1 className=" max-w-7xl  font-bold text-3xl md:text-7xl bg-gradient-to-t from-primary to-secondary bg-clip-text text-transparent">
              Ecommerce Performance Tracker
            </h1>
            <p className="mt-2 text-gray-500">
              Please enter your credentials to access your personalized
              ecommerce insights.
            </p>

            <div className="mt-5">
              <Button>
                <SignInButton mode="modal" />
              </Button>
             
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <Link
                href="/"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
                <Card className="absolute left-12 hidden group-hover:block  text-xs rounded p-1">
                  Dashboard
                </Card>
              </Link>
              <Link
                href="/Order"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
                <Card className="absolute left-12 hidden group-hover:block  text-xs rounded p-1">
                  Orders
                </Card>
              </Link>
              <Link
                href="/Product"
                className="group flex h-9 w-9 items-center justify-center bg-primary rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
                <Card className="absolute left-12 hidden group-hover:block text-xs rounded p-1">
                  Products
                </Card>
              </Link>
              <Link
                href="Customer"
                className="group flex h-9 w-9 items-center justify-center bg-primary rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
                <Card className="absolute left-12 hidden group-hover:block  text-xs rounded p-1">
                  Customers
                </Card>
              </Link>
              <Link
                href="#"
                className="group flex h-9 w-9 items-center justify-center bg-primary rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
                <Card className="absolute group-hover:block left-12 hidden text-xs rounded p-1">
                  Analytics
                </Card>
              </Link>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
              <Link
                href="#"
                className="group flex h-9 w-9 items-center justify-center bg-primary rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
                <Card className="absolute left-12 hidden group-hover:block  text-xs rounded p-1">
                  Settings
                </Card>
              </Link>
            </nav>
          </aside>
          <div className="flex flex-col  sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Orders
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Products
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Users2 className="h-5 w-5" />
                      Customers
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <LineChart className="h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link className="ml-5" href="#">
                        Dashboard
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <Link href="/create-organization">
                <Button>Create Organization</Button>
              </Link>
              <UserButton />
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
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card className=" w-full ">
                  <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
                    <div>
                      <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        +12,423
                      </h5>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        New Users
                      </p>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                      23%
                      <svg
                        className="w-3 h-3 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13V1m0 0L1 5m4-4 4 4"
                        />
                      </svg>
                    </div>
                  </div>
                  <SalsChar />
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex justify-between items-center pt-5">
                      {/* Dropdown menu */}
                      <Dropdown
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>
                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg  px-3 py-2"
                      >
                        Sales Report
                        <svg
                          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className=" w-full ">
                  <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
                    <div>
                      <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        $15,423
                      </h5>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Sales this week
                      </p>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                      55%
                      <svg
                        className="w-3 h-3 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13V1m0 0L1 5m4-4 4 4"
                        />
                      </svg>
                    </div>
                  </div>
                  <SalsChar2 />
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex justify-between items-center pt-5">
                      {/* Dropdown menu */}
                      <Dropdown
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>
                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg  px-3 py-2"
                      >
                        Sales Report
                        <svg
                          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className=" w-full  col-span-1 lg:col-span-1 md:col-span-2">
                  <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
                    <div>
                      <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        +2,256
                      </h5>
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        New Products
                      </p>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                      13%
                      <svg
                        className="w-3 h-3 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13V1m0 0L1 5m4-4 4 4"
                        />
                      </svg>
                    </div>
                  </div>
                  <ProductChar />
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
                    <div className="flex justify-between items-center pt-5">
                      {/* Dropdown menu */}
                      <Dropdown
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>
                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg  px-3 py-2"
                      >
                        Sales Report
                        <svg
                          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className=" w-full col-span-1 lg:col-span-3 md:col-span-2  p-4 md:p-6">
                  <div className="flex justify-between mb-5">
                    <div className="grid gap-4 grid-cols-2">
                      <div>
                        <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2 relative">
                          Clicks
                          <svg
                            onMouseEnter={handleMouseEnterClicks}
                            onMouseLeave={handleMouseLeaveClicks}
                            className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                          </svg>
                          {isClicksPopoverVisible && (
                            <div
                              role="tooltip"
                              className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                              style={{
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                              }}
                              onMouseEnter={handleMouseEnterClicks}
                              onMouseLeave={handleMouseLeaveClicks}
                            >
                              <div className="p-3 space-y-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Clicks growth - Incremental
                                </h3>
                                <p>
                                  Report helps navigate cumulative growth of
                                  community activities. Ideally, the chart
                                  should have a growing trend, as stagnating
                                  chart signifies a significant decrease of
                                  community activity.
                                </p>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Calculation
                                </h3>
                                <p>
                                  For each date bucket, the all-time volume of
                                  activities is calculated. This means that
                                  activities in period n contain all activities
                                  up to period n, plus the activities generated
                                  by your community in period.
                                </p>
                                <a
                                  href="#"
                                  className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                  Read more
                                  <svg
                                    className="w-2 h-2 ms-1.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m1 9 4-4-4-4"
                                    />
                                  </svg>
                                </a>
                              </div>
                              <div data-popper-arrow="" />
                            </div>
                          )}
                        </h5>
                        <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">
                          42,3k
                        </p>
                      </div>
                      <div>
                        <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2 relative">
                          CPC
                          <svg
                            onMouseEnter={handleMouseEnterCpc}
                            onMouseLeave={handleMouseLeaveCpc}
                            className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                          </svg>
                          {isCpcPopoverVisible && (
                            <div
                              role="tooltip"
                              className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                              style={{
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                              }}
                              onMouseEnter={handleMouseEnterCpc}
                              onMouseLeave={handleMouseLeaveCpc}
                            >
                              <div className="p-3 space-y-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  CPC growth - Incremental
                                </h3>
                                <p>
                                  Report helps navigate cumulative growth of
                                  community activities. Ideally, the chart
                                  should have a growing trend, as stagnating
                                  chart signifies a significant decrease of
                                  community activity.
                                </p>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Calculation
                                </h3>
                                <p>
                                  For each date bucket, the all-time volume of
                                  activities is calculated. This means that
                                  activities in period n contain all activities
                                  up to period n, plus the activities generated
                                  by your community in period.
                                </p>
                                <a
                                  href="#"
                                  className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                  Read more
                                  <svg
                                    className="w-2 h-2 ms-1.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m1 9 4-4-4-4"
                                    />
                                  </svg>
                                </a>
                              </div>
                              <div data-popper-arrow="" />
                            </div>
                          )}
                        </h5>
                        <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">
                          $5.40
                        </p>
                      </div>
                    </div>
                    <div>
                      {/* Dropdown menu */}

                      <Dropdown
                        className="dark:hover:text-black"
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="w-full h-96 overflow-hidden">
                    <LineChart1 />
                  </div>
                  <div className=" items-center flex border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                    <div className="pt-5">
                      <Button onClick={generatePDF}>
                        <a
                          href="#"
                          className="px-5 flex py-2.5 text-sm font-medium "
                        >
                          <svg
                            className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                          >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                          </svg>
                          View full report
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                <Card className=" w-full  p-4 md:p-6">
                  <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                        <svg
                          className="w-6 h-6 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 19"
                        >
                          <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                          <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                          3.4k
                        </h5>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          Leads generated per week
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                        <svg
                          className="w-2.5 h-2.5 me-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13V1m0 0L1 5m4-4 4 4"
                          />
                        </svg>
                        42.5%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <dl className="flex items-center">
                      <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                        Money spent:
                      </dt>
                      <dd className="text-gray-900 text-sm dark:text-white font-semibold">
                        $3,232
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-end">
                      <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                        Conversion rate:
                      </dt>
                      <dd className="text-gray-900 text-sm dark:text-white font-semibold">
                        1.2%
                      </dd>
                    </dl>
                  </div>
                  <div className="w-full h-[22rem] overflow-hidden">
                    <ColumnChart1 />
                  </div>
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                    <div className="flex justify-between bottom-0 mt-20 items-center pt-5">
                      {/* Dropdown menu */}
                      <Dropdown
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>
                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg   px-3 py-2"
                      >
                        Leads Report
                        <svg
                          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className=" w-full  p-4 md:p-6">
                  <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                    <dl>
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                        Profit
                      </dt>
                      <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                        $5,405
                      </dd>
                    </dl>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                        <svg
                          className="w-2.5 h-2.5 me-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13V1m0 0L1 5m4-4 4 4"
                          />
                        </svg>
                        Profit rate 23.5%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 py-3">
                    <dl>
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                        Income
                      </dt>
                      <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
                        $23,635
                      </dd>
                    </dl>
                    <dl>
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                        Expense
                      </dt>
                      <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
                        -$18,230
                      </dd>
                    </dl>
                  </div>
                  <div className="w-full h-96 overflow-hidden">
                    <BarChart />
                  </div>
                  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                    <div className="flex justify-between items-center pt-5">
                      {/* Dropdown menu */}
                      <Dropdown
                        style={{ backgroundColor: "#6D28D9" }}
                        label="Last 7 days"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item> Yesterday</Dropdown.Item>
                        <Dropdown.Item> Today</Dropdown.Item>
                        <Dropdown.Item> Last 7 days</Dropdown.Item>
                        <Dropdown.Item>Last 30 days</Dropdown.Item>
                      </Dropdown>

                      <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg px-3 py-2"
                      >
                        Revenue Report
                        <svg
                          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Transactions</CardTitle>
                      <CardDescription>
                        Recent transactions from your store.
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden xl:table-column">
                            Type
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Status
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Sale
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Approved
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Olivia Smith</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Refund
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Declined
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-24
                          </TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Noah Williams</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Subscription
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Approved
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-25
                          </TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Emma Brown</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Sale
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Approved
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-26
                          </TableCell>
                          <TableCell className="text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            Sale
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant="outline">
                              Approved
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                            2023-06-27
                          </TableCell>
                          <TableCell className="text-right">$550.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/02.png" alt="Avatar" />
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Jackson Lee
                        </p>
                        <p className="text-sm text-muted-foreground">
                          jackson.lee@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/03.png" alt="Avatar" />
                        <AvatarFallback>IN</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Isabella Nguyen
                        </p>
                        <p className="text-sm text-muted-foreground">
                          isabella.nguyen@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/04.png" alt="Avatar" />
                        <AvatarFallback>WK</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          William Kim
                        </p>
                        <p className="text-sm text-muted-foreground">
                          will@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/05.png" alt="Avatar" />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          Sofia Davis
                        </p>
                        <p className="text-sm text-muted-foreground">
                          sofia.davis@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$39.00</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </SignedIn>
    </main>
  );
}

const generatePDF = () => {
  const doc = new jsPDF();

  doc.text("Report Title", 20, 20);

  // Add some content to the PDF
  doc.autoTable({
    head: [["Column 1", "Column 2", "Column 3"]],
    body: [
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
    ],
  });

  doc.save("report.pdf");
};
