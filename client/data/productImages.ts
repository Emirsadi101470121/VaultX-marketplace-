export const productImages: Record<number, string> = {
  1: "https://images.pexels.com/photos/9661258/pexels-photo-9661258.jpeg?auto=compress&cs=tinysrgb&w=600",
  2: "https://images.pexels.com/photos/7524996/pexels-photo-7524996.jpeg?auto=compress&cs=tinysrgb&w=600",
  3: "https://images.pexels.com/photos/2263815/pexels-photo-2263815.jpeg?auto=compress&cs=tinysrgb&w=600",
  4: "https://images.pexels.com/photos/16886383/pexels-photo-16886383.jpeg?auto=compress&cs=tinysrgb&w=600",
  5: "https://images.pexels.com/photos/19946617/pexels-photo-19946617.jpeg?auto=compress&cs=tinysrgb&w=600",
  6: "https://images.pexels.com/photos/6827324/pexels-photo-6827324.jpeg?auto=compress&cs=tinysrgb&w=600",
  7: "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?auto=compress&cs=tinysrgb&w=600",
  8: "https://images.pexels.com/photos/7783413/pexels-photo-7783413.jpeg?auto=compress&cs=tinysrgb&w=600",
  9: "https://images.pexels.com/photos/28920048/pexels-photo-28920048.jpeg?auto=compress&cs=tinysrgb&w=600",
  10: "https://images.pexels.com/photos/35431751/pexels-photo-35431751.jpeg?auto=compress&cs=tinysrgb&w=600",
  11: "https://images.pexels.com/photos/34956929/pexels-photo-34956929.jpeg?auto=compress&cs=tinysrgb&w=600",
  12: "https://images.pexels.com/photos/31983500/pexels-photo-31983500.jpeg?auto=compress&cs=tinysrgb&w=600",
  13: "https://images.pexels.com/photos/15019857/pexels-photo-15019857.jpeg?auto=compress&cs=tinysrgb&w=600",
};

export function getProductImage(id: number): string {
  return productImages[id] || productImages[1];
}
