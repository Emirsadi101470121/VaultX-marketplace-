import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  DollarSign,
  Gavel,
  Package,
  ShieldCheck,
  Info,
  ChevronRight,
  X,
  Loader2,
  LogIn,
  ImagePlus,
  Clock,
} from "lucide-react";

const conditionOptions = ["Mint", "Near Mint", "Excellent", "Very Good", "Good", "Fair", "Poor", "PSA 10", "PSA 9", "PSA 8", "PSA 7", "CGC 9.8", "CGC 9.6", "Sealed", "CIB", "Loose"];
const itemTypes = ["physical", "digital"] as const;

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ImageFile {
  file: File;
  preview: string;
}

export default function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [condition, setCondition] = useState("");
  const [itemType, setItemType] = useState<"physical" | "digital">("physical");
  const [isAuction, setIsAuction] = useState(false);
  const [price, setPrice] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [auctionDuration, setAuctionDuration] = useState("7");
  const [shippingCost, setShippingCost] = useState("");
  const [requestVerification, setRequestVerification] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    supabase.from("categories").select("id, name, slug").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  if (!user) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <LogIn className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-white mb-2">Sign in required</h2>
          <p className="text-sm text-white/40 mb-6">You need to be signed in to create a listing.</p>
          <Link to="/auth/signin?redirect=/seller/create-listing" className="inline-flex h-12 px-8 rounded-xl font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all items-center">
            Sign In
          </Link>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-3">Listing Submitted for Review</h1>
          <p className="text-sm text-white/50 mb-8 leading-relaxed max-w-sm mx-auto">
            Your listing has been submitted and is now under review by the TradeGo team. You'll be notified once it's approved. You can track its status from your seller dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard" className="inline-flex h-12 px-8 rounded-xl font-semibold text-sm bg-white text-black hover:bg-white/90 transition-all items-center justify-center">
              Go to Dashboard
            </Link>
            <Link to="/seller/create-listing" onClick={() => { setSubmitted(false); setStep(1); setTitle(""); setDescription(""); setImages([]); setPrice(""); setStartingBid(""); }} className="inline-flex h-12 px-8 rounded-xl font-semibold text-sm glass text-white/60 hover:text-white transition-all items-center justify-center">
              Create Another
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const selectedCategoryName = categories.find((c) => c.id === categoryId)?.name ?? "";

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const newImages: ImageFile[] = [];
    const maxImages = 6 - images.length;
    for (let i = 0; i < Math.min(files.length, maxImages); i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be under 5MB.");
        return;
      }
      newImages.push({ file, preview: URL.createObjectURL(file) });
    }
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handlePublish() {
    setError(null);

    if (!title || !categoryId || !condition) {
      setError("Please fill in all required fields (title, category, condition).");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one photo of your item.");
      return;
    }

    const listingPrice = isAuction ? parseFloat(startingBid) : parseFloat(price);
    if (!listingPrice || listingPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    setSubmitting(true);

    const durationHours = parseInt(auctionDuration) * 24;
    const auctionEndsAt = isAuction
      ? new Date(Date.now() + durationHours * 3600000).toISOString()
      : null;

    const { data, error: insertError } = await supabase
      .from("listings")
      .insert({
        seller_id: user.id,
        category_id: categoryId,
        title,
        description: description || null,
        item_type: itemType,
        condition,
        listing_type: isAuction ? "auction" : "fixed",
        price: listingPrice,
        min_bid: isAuction ? listingPrice : null,
        reserve_price: isAuction && reservePrice ? parseFloat(reservePrice) : null,
        current_bid: null,
        auction_ends_at: auctionEndsAt,
        auction_duration_hours: isAuction ? durationHours : null,
        shipping_cost: shippingCost ? parseFloat(shippingCost) : 0,
        verification_requested: requestVerification,
        status: "pending_review",
      })
      .select("id")
      .single();

    if (insertError) {
      setSubmitting(false);
      setError(insertError.message);
      return;
    }

    const listingId = data.id;
    const uploadedUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const ext = img.file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${listingId}/${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(path, img.file, { upsert: true });

      if (uploadError) {
        setSubmitting(false);
        setError(`Failed to upload image ${i + 1}: ${uploadError.message}`);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);

      uploadedUrls.push(urlData.publicUrl);
    }

    const imageRows = uploadedUrls.map((url, i) => ({
      listing_id: listingId,
      url,
      alt_text: title,
      is_primary: i === 0,
      sort_order: i,
    }));

    await supabase.from("listing_images").insert(imageRows);

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-4">
            <Link to="/dashboard" className="hover:text-white/60 transition-colors">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/50">Create Listing</span>
          </nav>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Create New Listing</h1>
          <p className="text-sm text-white/40">List an item for sale or auction. All listings are reviewed before going live.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <StepIndicator step={step} setStep={setStep} />

        {step === 1 && (
          <StepDetails
            title={title} setTitle={setTitle}
            categoryId={categoryId} setCategoryId={setCategoryId}
            condition={condition} setCondition={setCondition}
            itemType={itemType} setItemType={setItemType}
            description={description} setDescription={setDescription}
            requestVerification={requestVerification} setRequestVerification={setRequestVerification}
            categories={categories}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepPhotos
            images={images}
            onImageSelect={handleImageSelect}
            onRemoveImage={removeImage}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <StepPricing
            isAuction={isAuction} setIsAuction={setIsAuction}
            price={price} setPrice={setPrice}
            startingBid={startingBid} setStartingBid={setStartingBid}
            reservePrice={reservePrice} setReservePrice={setReservePrice}
            auctionDuration={auctionDuration} setAuctionDuration={setAuctionDuration}
            shippingCost={shippingCost} setShippingCost={setShippingCost}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <StepReview
            title={title}
            selectedCategoryName={selectedCategoryName}
            condition={condition}
            itemType={itemType}
            isAuction={isAuction}
            auctionDuration={auctionDuration}
            price={price}
            startingBid={startingBid}
            shippingCost={shippingCost}
            requestVerification={requestVerification}
            images={images}
            submitting={submitting}
            onBack={() => setStep(3)}
            onPublish={handlePublish}
          />
        )}
      </div>
    </Layout>
  );
}

function StepDetails({ title, setTitle, categoryId, setCategoryId, condition, setCondition, itemType, setItemType, description, setDescription, requestVerification, setRequestVerification, categories, onNext }: any) {
  return (
    <div className="space-y-6">
      <Field label="Item Title *">
        <input type="text" value={title} onChange={(e: any) => setTitle(e.target.value)} placeholder="e.g. Charizard Base Set Holo 1st Edition PSA 9" className="form-input" />
        <p className="text-[10px] text-white/20 mt-1.5">Be specific — include brand, edition, condition, and grading if applicable.</p>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Category *">
          <select value={categoryId} onChange={(e: any) => setCategoryId(e.target.value ? Number(e.target.value) : "")} className="form-input appearance-none cursor-pointer">
            <option value="" className="bg-[hsl(228,15%,12%)]">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id} className="bg-[hsl(228,15%,12%)] text-white">{cat.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Condition *">
          <select value={condition} onChange={(e: any) => setCondition(e.target.value)} className="form-input appearance-none cursor-pointer">
            <option value="" className="bg-[hsl(228,15%,12%)]">Select condition</option>
            {conditionOptions.map((cond) => (
              <option key={cond} value={cond} className="bg-[hsl(228,15%,12%)] text-white">{cond}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Item Type *">
        <div className="flex gap-3">
          {itemTypes.map((type) => (
            <button key={type} onClick={() => setItemType(type)} className={`flex-1 h-12 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border-2 ${itemType === type ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.12]"}`}>
              <Package className="w-4 h-4" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Description *">
        <textarea rows={5} value={description} onChange={(e: any) => setDescription(e.target.value)} placeholder="Describe your item in detail — history, provenance, condition notes, included accessories..." className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30 transition-all resize-none" />
      </Field>

      <div className="glass rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={requestVerification} onChange={(e: any) => setRequestVerification(e.target.checked)} className="mt-1 accent-blue-500" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Request Authenticity Verification</span>
            </div>
            <p className="text-xs text-white/35 leading-relaxed">Submit this item for TradeGo verification. Verified items receive a trust badge and typically sell 40% faster.</p>
          </div>
        </label>
      </div>

      <button onClick={onNext} className="w-full h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20">
        Continue to Photos
      </button>
    </div>
  );
}

function StepPhotos({ images, onImageSelect, onRemoveImage, onBack, onNext }: { images: ImageFile[]; onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void; onRemoveImage: (i: number) => void; onBack: () => void; onNext: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-white/50 mb-1.5">Item Photos * <span className="text-white/25">({images.length}/6)</span></p>
        <p className="text-[10px] text-white/20 mb-4">Upload clear photos of your item. First image will be the cover photo. Max 5MB each.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/[0.08] group">
              <img src={img.preview} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">COVER</span>
              )}
              <button onClick={() => onRemoveImage(i)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}

          {images.length < 6 && (
            <button onClick={() => inputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-white/[0.1] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.04] flex flex-col items-center justify-center gap-2 transition-all cursor-pointer">
              <ImagePlus className="w-6 h-6 text-white/25" />
              <span className="text-[10px] text-white/25 font-medium">Add Photo</span>
            </button>
          )}
        </div>

        <input ref={inputRef} type="file" accept="image/*" multiple onChange={onImageSelect} className="hidden" />
      </div>

      <div className="glass rounded-xl p-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-white/40 leading-relaxed">
          Good photos increase your chances of a quick sale. Include photos from multiple angles, close-ups of any damage or special features, and the item's packaging if available.
        </p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 h-12 rounded-xl font-semibold text-sm glass text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">Back</button>
        <button onClick={onNext} className="flex-[2] h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20">
          Continue to Pricing
        </button>
      </div>
    </div>
  );
}

function StepPricing({ isAuction, setIsAuction, price, setPrice, startingBid, setStartingBid, reservePrice, setReservePrice, auctionDuration, setAuctionDuration, shippingCost, setShippingCost, onBack, onNext }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-medium text-white/50 mb-3 block">Listing Type *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => setIsAuction(false)} className={`h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${!isAuction ? "border-blue-500/40 bg-blue-500/10 text-blue-400" : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.12]"}`}>
            <DollarSign className="w-6 h-6" />
            <span className="text-sm font-semibold">Fixed Price</span>
          </button>
          <button onClick={() => setIsAuction(true)} className={`h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${isAuction ? "border-violet-500/40 bg-violet-500/10 text-violet-400" : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.12]"}`}>
            <Gavel className="w-6 h-6" />
            <span className="text-sm font-semibold">Auction</span>
          </button>
        </div>
      </div>

      {!isAuction ? (
        <Field label="Price (USD) *">
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input type="number" step="0.01" value={price} onChange={(e: any) => setPrice(e.target.value)} placeholder="0.00" className="form-input pl-10" />
          </div>
        </Field>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Starting Bid (USD) *">
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="number" step="0.01" value={startingBid} onChange={(e: any) => setStartingBid(e.target.value)} placeholder="0.00" className="form-input pl-10" />
              </div>
            </Field>
            <Field label="Reserve Price (optional)">
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="number" step="0.01" value={reservePrice} onChange={(e: any) => setReservePrice(e.target.value)} placeholder="0.00" className="form-input pl-10" />
              </div>
            </Field>
          </div>
          <Field label="Auction Duration *">
            <select value={auctionDuration} onChange={(e: any) => setAuctionDuration(e.target.value)} className="form-input appearance-none cursor-pointer">
              <option value="1" className="bg-[hsl(228,15%,12%)] text-white">1 Day</option>
              <option value="3" className="bg-[hsl(228,15%,12%)] text-white">3 Days</option>
              <option value="5" className="bg-[hsl(228,15%,12%)] text-white">5 Days</option>
              <option value="7" className="bg-[hsl(228,15%,12%)] text-white">7 Days</option>
              <option value="14" className="bg-[hsl(228,15%,12%)] text-white">14 Days</option>
            </select>
          </Field>
          <div className="glass rounded-xl p-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/40 leading-relaxed">Reserve price is the minimum amount you'll accept. If bidding doesn't reach it, the item won't sell. Reserve prices are hidden from bidders.</p>
          </div>
        </div>
      )}

      <Field label="Shipping Cost (USD)">
        <input type="number" step="0.01" value={shippingCost} onChange={(e: any) => setShippingCost(e.target.value)} placeholder="0.00 (leave empty for free shipping)" className="form-input" />
      </Field>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 h-12 rounded-xl font-semibold text-sm glass text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">Back</button>
        <button onClick={onNext} className="flex-[2] h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20">
          Continue to Review
        </button>
      </div>
    </div>
  );
}

function StepReview({ title, selectedCategoryName, condition, itemType, isAuction, auctionDuration, price, startingBid, shippingCost, requestVerification, images, submitting, onBack, onPublish }: any) {
  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="font-display font-semibold text-white mb-4">Listing Preview</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            {images.length > 0 ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={images[0].preview} alt={title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                <Package className="w-7 h-7 text-white/30" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{title || "Untitled"}</p>
              <p className="text-xs text-white/35 mt-0.5">{selectedCategoryName || "No category"} · {condition || "No condition"}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-white/30 uppercase tracking-wider">{isAuction ? "Starting Bid" : "Price"}</p>
              <p className="text-lg font-bold text-white">${isAuction ? (startingBid || "0") : (price || "0")}</p>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img: ImageFile, i: number) => (
                <div key={i} className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/[0.08]">
                  <img src={img.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Listing Type", value: isAuction ? `Auction (${auctionDuration} days)` : "Fixed Price" },
              { label: "Item Type", value: itemType.charAt(0).toUpperCase() + itemType.slice(1) },
              { label: "Photos", value: `${images.length} uploaded` },
              { label: "Verification", value: requestVerification ? "Requested" : "Standard" },
              { label: "Shipping", value: shippingCost ? `$${shippingCost}` : "Free" },
              { label: "Status", value: "Pending Review" },
            ].map((field) => (
              <div key={field.label} className="glass rounded-lg p-3">
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{field.label}</p>
                <p className="text-sm text-white/70">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-4 flex items-start gap-3">
        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white mb-1">Review Process</p>
          <p className="text-xs text-white/35 leading-relaxed">
            Your listing will be reviewed by the TradeGo team before it goes live. This ensures quality and protects our community. You can track the status from your seller dashboard.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 h-12 rounded-xl font-semibold text-sm glass text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">Back</button>
        <button onClick={onPublish} disabled={submitting} className="flex-[2] h-12 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2">
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitting ? "Submitting..." : "Submit for Review"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-white/50 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function StepIndicator({ step, setStep }: { step: number; setStep: (s: number) => void }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {[
        { num: 1, label: "Details" },
        { num: 2, label: "Photos" },
        { num: 3, label: "Pricing" },
        { num: 4, label: "Review" },
      ].map((s, i) => (
        <div key={s.num} className="flex items-center gap-2 flex-1">
          <button onClick={() => setStep(s.num)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all w-full ${step === s.num ? "bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30" : step > s.num ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.03] text-white/30"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step === s.num ? "bg-blue-600 text-white" : step > s.num ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.06] text-white/20"}`}>
              {step > s.num ? "\u2713" : s.num}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
          {i < 3 && <ChevronRight className="w-4 h-4 text-white/10 shrink-0 hidden sm:block" />}
        </div>
      ))}
    </div>
  );
}
