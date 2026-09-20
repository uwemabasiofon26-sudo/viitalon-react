import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "@/lib/productData";

// Static-data-backed versions of the original Base44 hooks.
// Kept as useQuery so every consuming component (Header, Home, Shop,
// ProductDetail, Stack, PerformanceNutrition) needs zero changes.

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return [...PRODUCTS].sort(
        (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
      );
    },
  });
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      return PRODUCTS.find((p) => p.slug === slug);
    },
    enabled: !!slug,
  });
}
