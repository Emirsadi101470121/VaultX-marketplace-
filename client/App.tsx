import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Marketplace = lazy(() => import("./pages/Marketplace"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Auctions = lazy(() => import("./pages/Auctions"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const TrustSafety = lazy(() => import("./pages/TrustSafety"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SellerProfile = lazy(() => import("./pages/SellerProfile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RoleSelection = lazy(() => import("./pages/RoleSelection"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const Admin = lazy(() => import("./pages/Admin"));
const Support = lazy(() => import("./pages/Support"));
const About = lazy(() => import("./pages/About"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen bg-[hsl(228,16%,5%)] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/trust-safety" element={<TrustSafety />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/verify" element={<VerifyAccount />} />
              <Route path="/seller/:id" element={<SellerProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth/role-selection" element={<RoleSelection />} />
              <Route path="/seller/create-listing" element={<CreateListing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
