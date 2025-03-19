"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = (props: Props) => {
  const { items: cartItems, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error("Stripe instance not found");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      <div className="mt-6 grid gap-4">
        <Button
          size="lg"
          className="w-full"
          disabled={loading || cartItems.length === 0}
          onClick={onCheckout}
        >
          {loading ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
