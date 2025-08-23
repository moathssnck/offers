import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: ' السوار الذكي رفيقك المثالي',
  description: "استمتع بطريقة دفع مبتكرة مع سوار الدفع الذكي من كي نت، حيث يجمع بين الراحة والأمان والتصميم العصري. أصبح بإمكانك الآن التسوق أو الدفع بسرعة وسهولة بدون الحاجة إلى حمل بطاقتك أو محفظتك. بتقنية آمنة وألوان متنوعة تناسب جميع الأذواق، سيكون السوار الذكي رفيقك المثالي في كل مكان وزمان.",  
  viewport: {
    width: "device-width",
    initialScale: 1,
     maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <head>
      <meta property="og:image" content="https://kabkg.com/images/knet.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
