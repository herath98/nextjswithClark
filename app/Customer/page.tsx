"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  File,
  Home,
  ChevronLeft,
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
  Upload,
  Users2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Label, Modal } from "flowbite-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Dashboard() {
  const [openModal, setttOpenModal] = useState(false);
  const { setTheme } = useTheme();
  const products = useQuery(api.Customer.getProducts);
  const addProduct = useMutation(api.Customer.addProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newProduct, setNewProduct] = useState({
    name: "",
    status: "Draft",
    price: "",
    sales: 0,
    createdAt: new Date().toISOString(),
    
  });

  const handleAddProduct = async (event) => {
    event.preventDefault();
    await addProduct({ product: newProduct });
    setNewProduct({
      name: "",
      status: "Draft",
      price: "",
      sales: 0,
      createdAt: new Date().toISOString(),
      
    });
    setIsModalOpen(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Status",
      "Price",
      "Total Sales",
      "Created At",
    ];
    const tableRows = [];

    products
      .filter((product) => filter === "all" || product.status === filter)
      .forEach((product) => {
        const productData = [
          product.name,
          product.status,
          product.price,
          product.sales,
          new Date(product.createdAt).toLocaleDateString(),
        ];
        tableRows.push(productData);
      });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("Costomer.pdf");
  };

  if (!products) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen border 0">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => filter === "all" || product.status === filter
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <Link
                href="/"
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
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
                href="/Customer"
                className="group flex h-9 w-9 items-center justify-center  rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 relative"
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
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
                      href="/"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/Order"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Orders
                    </Link>
                    <Link
                      href="/Product"
                      className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Products
                    </Link>
                    <Link
                      href="/Customer"
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
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
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
          <>
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setFilter("all")}>
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    checked={filter === "all"}
                    onCheckedChange={() => setFilter("all")}
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="draft"
                    checked={filter === "Draft"}
                    onCheckedChange={() => setFilter("Draft")}
                  >
                    Draft
                  </TabsTrigger>
                  <TabsTrigger
                    value="archived"
                    checked={filter === "Archived"}
                    onCheckedChange={() => setFilter("Archived")}
                  >
                    Archived
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={filter === "Active"}
                        onCheckedChange={() => setFilter("Active")}
                      >
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filter === "Draft"}
                        onCheckedChange={() => setFilter("Draft")}
                      >
                        Draft
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={filter === "Archived"}
                        onCheckedChange={() => setFilter("Archived")}
                      >
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    onClick={handleExportPDF}
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Customer
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>
                      Manage your Customers and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                        
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Total Price
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Buying Item
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Joined Date
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product._id}>
                           
                            <TableCell className="font-medium">
                              {product.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.price}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.sales}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.createdAt}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => setttOpenModal(true)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-{filteredProducts.length}</strong> of{" "}
                      <strong>{filteredProducts.length}</strong> products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <Modal
              dismissible
              size={"5xl"}
              show={openModal}
              onClose={() => setttOpenModal(false)}
              
            >
             
              <Modal.Header className="bg-background">Edit Product</Modal.Header>
              <Modal.Body className="bg-background">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                      </Button>
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Pro Controller
                      </h1>
                      <Badge variant="outline" className="ml-auto sm:ml-0">
                        In stock
                      </Badge>
                      <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                          Discard
                        </Button>
                        <Button size="sm">Save Product</Button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                          <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>
                              Lipsum dolor sit amet, consectetur adipiscing elit
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  type="text"
                                  className="w-full"
                                  defaultValue="Gamer Gear Pro Controller"
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                  className="min-h-32"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-1">
                          <CardHeader>
                            <CardTitle>Stock</CardTitle>
                            <CardDescription>
                              Lipsum dolor sit amet, consectetur adipiscing elit
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px]">
                                    SKU
                                  </TableHead>
                                  <TableHead>Stock</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead className="w-[100px]">
                                    Size
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-semibold">
                                    GGPC-001
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="stock-1"
                                      className="sr-only"
                                    >
                                      Stock
                                    </Label>
                                    <Input
                                      id="stock-1"
                                      type="number"
                                      defaultValue="100"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="price-1"
                                      className="sr-only"
                                    >
                                      Price
                                    </Label>
                                    <Input
                                      id="price-1"
                                      type="number"
                                      defaultValue="99.99"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <ToggleGroup
                                      type="single"
                                      defaultValue="s"
                                      variant="outline"
                                    >
                                      <ToggleGroupItem value="s">
                                        S
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="m">
                                        M
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="l">
                                        L
                                      </ToggleGroupItem>
                                    </ToggleGroup>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-semibold">
                                    GGPC-002
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="stock-2"
                                      className="sr-only"
                                    >
                                      Stock
                                    </Label>
                                    <Input
                                      id="stock-2"
                                      type="number"
                                      defaultValue="143"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="price-2"
                                      className="sr-only"
                                    >
                                      Price
                                    </Label>
                                    <Input
                                      id="price-2"
                                      type="number"
                                      defaultValue="99.99"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <ToggleGroup
                                      type="single"
                                      defaultValue="m"
                                      variant="outline"
                                    >
                                      <ToggleGroupItem value="s">
                                        S
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="m">
                                        M
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="l">
                                        L
                                      </ToggleGroupItem>
                                    </ToggleGroup>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-semibold">
                                    GGPC-003
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="stock-3"
                                      className="sr-only"
                                    >
                                      Stock
                                    </Label>
                                    <Input
                                      id="stock-3"
                                      type="number"
                                      defaultValue="32"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Label
                                      htmlFor="price-3"
                                      className="sr-only"
                                    >
                                      Stock
                                    </Label>
                                    <Input
                                      id="price-3"
                                      type="number"
                                      defaultValue="99.99"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <ToggleGroup
                                      type="single"
                                      defaultValue="s"
                                      variant="outline"
                                    >
                                      <ToggleGroupItem value="s">
                                        S
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="m">
                                        M
                                      </ToggleGroupItem>
                                      <ToggleGroupItem value="l">
                                        L
                                      </ToggleGroupItem>
                                    </ToggleGroup>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                          <CardFooter className="justify-center border-t p-4">
                            <Button size="sm" variant="ghost" className="gap-1">
                              <PlusCircle className="h-3.5 w-3.5" />
                              Add Variant
                            </Button>
                          </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-2">
                          <CardHeader>
                            <CardTitle>Product Category</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6 sm:grid-cols-3">
                              <div className="grid gap-3">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                  <SelectTrigger
                                    id="category"
                                    aria-label="Select category"
                                  >
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="clothing">
                                      Clothing
                                    </SelectItem>
                                    <SelectItem value="electronics">
                                      Electronics
                                    </SelectItem>
                                    <SelectItem value="accessories">
                                      Accessories
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="subcategory">
                                  Subcategory (optional)
                                </Label>
                                <Select>
                                  <SelectTrigger
                                    id="subcategory"
                                    aria-label="Select subcategory"
                                  >
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="t-shirts">
                                      T-Shirts
                                    </SelectItem>
                                    <SelectItem value="hoodies">
                                      Hoodies
                                    </SelectItem>
                                    <SelectItem value="sweatshirts">
                                      Sweatshirts
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                          <CardHeader>
                            <CardTitle>Product Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select>
                                  <SelectTrigger
                                    id="status"
                                    aria-label="Select status"
                                  >
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">
                                      Active
                                    </SelectItem>
                                    <SelectItem value="archived">
                                      Archived
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card
                          className="overflow-hidden"
                          x-chunk="dashboard-07-chunk-4"
                        >
                          <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                            <CardDescription>
                              Lipsum dolor sit amet, consectetur adipiscing elit
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-2">
                              <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="300"
                                src="/placeholder.svg"
                                width="300"
                              />
                              <div className="grid grid-cols-3 gap-2">
                                <button>
                                  <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src="/placeholder.svg"
                                    width="84"
                                  />
                                </button>
                                <button>
                                  <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src="/placeholder.svg"
                                    width="84"
                                  />
                                </button>
                                <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                  <span className="sr-only">Upload</span>
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-5">
                          <CardHeader>
                            <CardTitle>Archive Product</CardTitle>
                            <CardDescription>
                              Lipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div></div>
                            <Button size="sm" variant="secondary">
                              Archive Product
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                      <Button size="sm">Save Product</Button>
                    </div>
                  </div>
                </main>
              </Modal.Body>
            
            </Modal>

            {/* Add Product Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => setIsModalOpen(false)}
              >
                <Card
                  className=" rounded-lg p-8 w-full max-w-md border "
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Add New Product
                  </h2>
                  <form onSubmit={handleAddProduct}>
                    <div className="mb-4">
                      <Label className="block text-sm font-medium text-gray-700">
                        Product Name
                      </Label>
                      <Input
                        type="text"
                        className="mt-1 block w-full p-2 text-gray-500 dark:text-white border border-gray-300 rounded-md"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Label className="block text-sm font-medium text-gray-700">
                        Price
                      </Label>
                      <Input
                        type="text"
                        className="mt-1 block w-full p-2 text-gray-500 dark:text-white border border-gray-300 rounded-md"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Label className="block text-sm font-medium text-gray-700">
                        Status
                      </Label>

                      <select
                        className="mt-1 block w-full p-2  border  text-gray-500 dark:text-white bg-white  border-gray-300     dark:bg-background dark:border-white  rounded-md"
                        value={newProduct.status}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Draft">Draft</option>
                        <option value="Active">Active</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <Label className="block text-sm font-medium text-gray-700">
                        Sales
                      </Label>
                      <Input
                        type="number"
                        className="mt-1 block w-full p-2 text-gray-500 dark:text-white border border-gray-300 rounded-md"
                        placeholder="Total Sales"
                        value={newProduct.sales}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            sales: parseInt(e.target.value, 10),
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md"
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </Card>
              </div>
            )}
          </>
        </main>
      </div>
    </div>
  );
}
