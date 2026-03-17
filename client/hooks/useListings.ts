import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Listing {
  id: string;
  title: string;
  description: string | null;
  category_name: string;
  category_slug: string;
  price: number;
  listing_type: "fixed" | "auction";
  condition: string;
  current_bid: number | null;
  bid_count: number;
  watchers_count: number;
  views_count: number;
  is_verified: boolean;
  status: string;
  auction_ends_at: string | null;
  shipping_cost: number;
  item_type: string;
  created_at: string;
  seller_id: string;
  seller_username: string;
  seller_display_name: string | null;
  seller_verified: boolean;
  primary_image_url: string | null;
}

export function useListings() {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async (): Promise<Listing[]> => {
      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          categories!inner(name, slug),
          profiles!inner(username, display_name, is_verified_seller),
          listing_images(url, is_primary)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category_name: item.categories.name,
        category_slug: item.categories.slug,
        price: item.price,
        listing_type: item.listing_type,
        condition: item.condition,
        current_bid: item.current_bid,
        bid_count: item.bid_count,
        watchers_count: item.watchers_count,
        views_count: item.views_count,
        is_verified: item.is_verified,
        status: item.status,
        auction_ends_at: item.auction_ends_at,
        shipping_cost: item.shipping_cost,
        item_type: item.item_type,
        created_at: item.created_at,
        seller_id: item.seller_id,
        seller_username: item.profiles.username,
        seller_display_name: item.profiles.display_name,
        seller_verified: item.profiles.is_verified_seller,
        primary_image_url:
          item.listing_images?.find((img: any) => img.is_primary)?.url ??
          item.listing_images?.[0]?.url ??
          null,
      }));
    },
  });
}

export function useListingById(id: string | undefined) {
  return useQuery({
    queryKey: ["listing", id],
    enabled: !!id,
    queryFn: async (): Promise<Listing | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("listings")
        .select(`
          *,
          categories!inner(name, slug),
          profiles!inner(username, display_name, is_verified_seller),
          listing_images(url, alt_text, is_primary, sort_order)
        `)
        .eq("id", id)
        .single();

      if (error) return null;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category_name: data.categories.name,
        category_slug: data.categories.slug,
        price: data.price,
        listing_type: data.listing_type,
        condition: data.condition,
        current_bid: data.current_bid,
        bid_count: data.bid_count,
        watchers_count: data.watchers_count,
        views_count: data.views_count,
        is_verified: data.is_verified,
        status: data.status,
        auction_ends_at: data.auction_ends_at,
        shipping_cost: data.shipping_cost,
        item_type: data.item_type,
        created_at: data.created_at,
        seller_id: data.seller_id,
        seller_username: data.profiles.username,
        seller_display_name: data.profiles.display_name,
        seller_verified: data.profiles.is_verified_seller,
        primary_image_url:
          data.listing_images?.find((img: any) => img.is_primary)?.url ??
          data.listing_images?.[0]?.url ??
          null,
      };
    },
  });
}
