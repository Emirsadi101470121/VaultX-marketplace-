import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { HeroParallax, Product } from "@/components/ui/hero-parallax";

const products: Product[] = [
  {
    title: "Charizard Base Set Holo 1st Edition",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/9661258/pexels-photo-9661258.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$12,500",
    category: "Pokémon",
    condition: "Near Mint",
    description: "Iconic 1st Edition holographic Charizard from the original Base Set. PSA graded.",
  },
  {
    title: "Amazing Spider-Man #300 CGC 9.6",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/7768661/pexels-photo-7768661.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$4,200",
    category: "Comic Books",
    condition: "CGC 9.6",
    description: "First appearance of Venom. Todd McFarlane cover art in pristine condition.",
  },
  {
    title: "Nintendo Game Boy Color — Atomic Purple",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/2263815/pexels-photo-2263815.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$380",
    category: "Retro Games",
    condition: "Excellent",
    description: "Complete in box with original packaging and manuals. Fully functional.",
  },
  {
    title: "Black Lotus MTG Alpha — PSA 7",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/7783413/pexels-photo-7783413.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$28,900",
    category: "Trading Cards",
    condition: "PSA 7",
    description: "The most legendary Magic: The Gathering card ever printed. Alpha edition.",
  },
  {
    title: "Limited Edition Cyberpunk Figure #042",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/5618257/pexels-photo-5618257.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$750",
    category: "Figurines",
    condition: "Sealed",
    description: "Limited run of 500 worldwide. Hand-painted designer collectible with COA.",
  },
  {
    title: "Rare Vinyl — Abbey Road First Press",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/33003435/pexels-photo-33003435.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$2,100",
    category: "Vinyl Records",
    condition: "VG+",
    description: "Original 1969 UK first pressing. Misaligned Apple logo variant.",
  },
  {
    title: "Luxury Chronograph — Limited Run",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/10414975/pexels-photo-10414975.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$6,800",
    category: "Watches",
    condition: "Mint",
    description: "Swiss-made automatic chronograph. Limited to 250 pieces with box and papers.",
  },
  {
    title: "Rookie Card Collection — Graded Lot",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/7783413/pexels-photo-7783413.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$1,450",
    category: "Sports Cards",
    condition: "PSA 8-10",
    description: "Lot of 12 graded rookie cards from top NBA and NFL prospects.",
  },
  {
    title: "Exclusive Sneakers — Deadstock Pair",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/5584997/pexels-photo-5584997.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$920",
    category: "Sneakers",
    condition: "Deadstock",
    description: "Never worn, original box. Limited collaboration release, size 10 US.",
  },
  {
    title: "Ancient Gold & Silver Coin Set",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/8442327/pexels-photo-8442327.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$3,200",
    category: "Coins",
    condition: "Fine",
    description: "Set of 8 authenticated ancient Roman and Greek coins with display case.",
  },
  {
    title: "Ruby Gemstone Collection — Certified",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/13307185/pexels-photo-13307185.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$5,600",
    category: "Gemstones",
    condition: "Certified",
    description: "Three natural rubies with GIA certification. Total 4.2 carats.",
  },
  {
    title: "Vintage Film Camera — Praktica MTL3",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/30989765/pexels-photo-30989765.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$290",
    category: "Cameras",
    condition: "Working",
    description: "Classic 35mm SLR from East Germany. Fully serviced with 50mm lens.",
  },
  {
    title: "Gallery Art — Original Framed Piece",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/26605624/pexels-photo-26605624.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$8,500",
    category: "Fine Art",
    condition: "Original",
    description: "Oil on canvas, 24x36 inches. Signed by the artist with provenance.",
  },
  {
    title: "Rare Stamp Collection — Japanese Series",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/29916761/pexels-photo-29916761.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$1,800",
    category: "Stamps",
    condition: "Mint/Used Mix",
    description: "Collection of 45 rare Japanese postage stamps from 1870-1950.",
  },
  {
    title: "Diecast Model Car — Classic Yellow",
    link: "/marketplace",
    thumbnail: "https://images.pexels.com/photos/8281124/pexels-photo-8281124.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$180",
    category: "Model Cars",
    condition: "Like New",
    description: "1:18 scale diecast with opening doors, hood, and trunk. Display stand included.",
  },
];

function FeaturedHeader() {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <div className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 mb-4">
        <Flame className="w-4 h-4" />
        Trending Now
      </div>
      <h1 className="text-2xl md:text-7xl font-display font-bold text-white">
        Featured <br />
        <span className="text-gradient">Listings</span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white/50">
        Discover rare collectibles, graded cards, vintage electronics, and
        one-of-a-kind items from verified sellers around the world.
      </p>
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        View All Listings →
      </Link>
    </div>
  );
}

export default function FeaturedListings() {
  return <HeroParallax products={products} header={<FeaturedHeader />} />;
}
