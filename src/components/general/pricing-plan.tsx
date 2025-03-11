'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    planType: "free",
    name: "Free Plan",
    price: "Free",
    features: [
      { text: "Create up to 5 blogs", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "No earnings or withdrawals", included: false },
      { text: "No crypto withdrawals", included: false },
      { text: "Limited monetization (ads only)", included: false },
      { text: "No access to premium templates", included: false },
    ],
    buttonText: "Start for Free",
    popular: false,
  },
  {
    planType: "yearly",
    name: "Reminym Yearly",
    price: "$99 / year",
    features: [
      { text: "Unlimited blog creation", included: true },
      { text: "Advanced analytics & insights", included: true },
      { text: "Priority support", included: true },
      { text: "Earnings & withdrawal access", included: true },
      { text: "Crypto withdrawals (BTC, ETH, USDT)", included: true },
      { text: "Monetization via ads & affiliates", included: true },
      { text: "Access to premium templates", included: true },
    ],
    buttonText: "Get Yearly Plan",
    popular: true,
  },
  {
    planType: "lifetime",
    name: "Lifetime Generator",
    price: "$299 One-Time",
    features: [
      { text: "Unlimited blog creation", included: true },
      { text: "Lifetime access to all features", included: true },
      { text: "VIP customer support", included: true },
      { text: "Earnings & withdrawal access", included: true },
      { text: "Crypto withdrawals with higher limits", included: true },
      { text: "Higher revenue share on monetization", included: true },
      { text: "Exclusive premium blog templates", included: true },
    ],
    buttonText: "Get Lifetime Plan",
    popular: false,
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("yearly"); // Default selected plan

  return (
    <div className="bg-[#020817] text-white py-16 px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-400 mt-2">
          Start for free or unlock full earning potential with a premium plan.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.planType}
            onClick={() => setSelectedPlan(plan.planType)}
            className={`cursor-pointer border ${
              selectedPlan === plan.planType
                ? "border-blue-500 shadow-lg scale-105"
                : "border-gray-700"
            } bg-gray-900 rounded-2xl transition-all duration-200 hover:scale-105`}
          >
            <CardHeader>
              <CardTitle className="text-xl text-white opacity-[.5] font-semibold">{plan.name}</CardTitle>
              <p className="text-2xl font-bold text-white opacity-[.5]">{plan.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {feature.included ? (
                      <Check className="text-green-500 w-5 h-5 mr-2" />
                    ) : (
                      <X className="text-red-500 w-5 h-5 mr-2" />
                    )}
                    <span className={feature.included ? "text-white" : "text-gray-400"}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-6 w-full font-medium py-2 px-4 rounded-lg cursor-pointer ${
                  selectedPlan === plan.planType
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
