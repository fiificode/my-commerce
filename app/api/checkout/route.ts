import { NextResponse } from "next/server";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
    try {
        const {items} = await request.json();
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items : lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
        });
        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
}