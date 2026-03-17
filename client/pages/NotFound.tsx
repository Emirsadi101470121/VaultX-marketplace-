import PlaceholderPage from "@/components/PlaceholderPage";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <PlaceholderPage
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved. Head back to the marketplace to continue browsing."
      icon={<AlertCircle className="w-8 h-8" />}
    />
  );
}
