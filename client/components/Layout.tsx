import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CardNav from "@/components/CardNav";
import type { CardNavItem } from "@/components/CardNav";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconShoppingBag,
  IconGavel,
  IconCategory,
  IconUserCircle,
  IconBuildingStore,
  IconInfoCircle,
} from "@tabler/icons-react";

const cardNavItems: CardNavItem[] = [
  {
    label: "Marketplace",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Browse All", href: "/marketplace", ariaLabel: "Browse Marketplace" },
      { label: "Live Auctions", href: "/auctions", ariaLabel: "Live Auctions" },
      { label: "How It Works", href: "/how-it-works", ariaLabel: "How It Works" },
    ],
  },
  {
    label: "Account",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Dashboard", href: "/dashboard", ariaLabel: "Dashboard" },
      { label: "Create Listing", href: "/seller/create-listing", ariaLabel: "Create Listing" },
    ],
  },
  {
    label: "Platform",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Trust & Safety", href: "/trust-safety", ariaLabel: "Trust & Safety" },
      { label: "Support", href: "/support", ariaLabel: "Support" },
      { label: "About", href: "/about", ariaLabel: "About TradeGo" },
      { label: "Admin", href: "/admin", ariaLabel: "Admin Panel" },
    ],
  },
];

function Header() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const logo = (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
        <Shield className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-display font-bold text-lg tracking-tight text-white">
        Trade<span className="text-gradient">Go</span>
      </span>
    </Link>
  );

  async function handleButtonClick() {
    if (user) {
      await signOut();
      navigate("/");
    } else {
      navigate("/auth/signin");
    }
  }

  return (
    <div className="relative z-50 h-[80px] md:h-[100px]">
      <CardNav
        logo={logo}
        items={cardNavItems}
        baseColor="rgba(15, 10, 25, 0.85)"
        menuColor="#fff"
        buttonBgColor={user ? "#dc2626" : "#7c3aed"}
        buttonTextColor="#fff"
        buttonLabel={user ? "Sign Out" : "Sign In"}
        buttonHref={user ? undefined : "/auth/signin"}
        ease="power3.out"
        onLinkClick={(href) => navigate(href)}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}

const footerNavLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Auctions", href: "/auctions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Support", href: "/support" },
  { label: "Privacy", href: "/trust-safety" },
  { label: "Terms", href: "/trust-safety" },
];

function FooterSocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Centered Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Trade<span className="text-gradient">Go</span>
            </span>
          </Link>
        </div>

        {/* Centered Nav Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {footerNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-dashed border-white/[0.08] mb-8" />

        {/* Bottom: Copyright + Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} TradeGo Marketplace
          </p>
          <div className="flex items-center gap-3">
            <FooterSocialIcon href="https://twitter.com" label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.32 3.91A12.16 12.16 0 013.16 4.86a4.28 4.28 0 001.33 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.27 4.27 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0024 5.55a8.49 8.49 0 01-2.54.7z"/></svg>
            </FooterSocialIcon>
            <FooterSocialIcon href="https://linkedin.com" label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77A1.75 1.75 0 000 1.73v20.54A1.75 1.75 0 001.77 24h20.46A1.75 1.75 0 0024 22.27V1.73A1.75 1.75 0 0022.23 0z"/></svg>
            </FooterSocialIcon>
            <FooterSocialIcon href="https://github.com" label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .3a12 12 0 00-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.61c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.38 11.38 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.24 3.22c0 4.61-2.81 5.63-5.48 5.93a2.86 2.86 0 01.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 .3z"/></svg>
            </FooterSocialIcon>
            <FooterSocialIcon href="https://facebook.com" label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.07a12 12 0 10-13.88 11.86v-8.39H7.08v-3.47h3.04V9.41c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87v2.25h3.33l-.53 3.47h-2.8v8.39A12 12 0 0024 12.07z"/></svg>
            </FooterSocialIcon>
            <FooterSocialIcon href="https://instagram.com" label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.25 2.43.41.61.24 1.05.52 1.51.98.46.46.74.9.98 1.51.17.46.36 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.97-.41 2.43a4.07 4.07 0 01-.98 1.51c-.46.46-.9.74-1.51.98-.46.17-1.26.36-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.25-2.43-.41a4.07 4.07 0 01-1.51-.98 4.07 4.07 0 01-.98-1.51c-.17-.46-.36-1.26-.41-2.43C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.97.41-2.43.24-.61.52-1.05.98-1.51a4.07 4.07 0 011.51-.98c.46-.17 1.26-.36 2.43-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.94 5.94 0 00-2.15 1.4A5.94 5.94 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.47 1.4 2.15a5.94 5.94 0 002.15 1.4c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.94 5.94 0 002.15-1.4 5.94 5.94 0 001.4-2.15c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.94 5.94 0 00-1.4-2.15A5.94 5.94 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </FooterSocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

const dockItems = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-white/70" />,
    href: "/",
  },
  {
    title: "Marketplace",
    icon: <IconShoppingBag className="h-full w-full text-white/70" />,
    href: "/marketplace",
  },
  {
    title: "Auctions",
    icon: <IconGavel className="h-full w-full text-white/70" />,
    href: "/auctions",
  },
  {
    title: "Categories",
    icon: <IconCategory className="h-full w-full text-white/70" />,
    href: "/marketplace",
  },
  {
    title: "Sell",
    icon: <IconBuildingStore className="h-full w-full text-white/70" />,
    href: "/seller/create-listing",
  },
  {
    title: "Dashboard",
    icon: <IconUserCircle className="h-full w-full text-white/70" />,
    href: "/dashboard",
  },
  {
    title: "About",
    icon: <IconInfoCircle className="h-full w-full text-white/70" />,
    href: "/about",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
        <FloatingDock items={dockItems} mobileClassName="fixed bottom-4 right-4" />
      </div>
    </div>
  );
}
