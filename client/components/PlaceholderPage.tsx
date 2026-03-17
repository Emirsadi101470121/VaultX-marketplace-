import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Construction, ArrowLeft } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="glass rounded-3xl p-12 md:p-20 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-6 text-white/30">
            {icon || <Construction className="w-8 h-8" />}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            {title}
          </h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            {description || "This page is coming soon. Check back later for full content and functionality."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium glass text-white/60 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
