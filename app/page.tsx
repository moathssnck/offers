"use client"

import { FullPageCarousel } from "@/components/full-page-imgs"
import { useState } from "react"
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


export default function HomePage() {
  const [showCarousel, setShowCarousel] = useState(true)

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
