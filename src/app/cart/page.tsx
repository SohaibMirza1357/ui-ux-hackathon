"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";

export default function CartPage() {
  const cartState = useAppSelector((state: RootState) => state.carts);
  const { cart, totalPrice, adjustedTotalPrice } = cartState;

  // Helper function to compute the discount percentage
  const computeDiscountPercentage = (total: number, adjusted: number) => {
    return Math.round(((total - adjusted) / total) * 100);
  };

  // Helper function to render order summary
  const renderOrderSummary = () => {
    const discountAmount = totalPrice - adjustedTotalPrice;

    return (
      <>
        <li className="flex justify-between items-center">
          <span className="md:text-xl text-black/60">Subtotal</span>
          <span className="md:text-xl font-bold">${totalPrice}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="md:text-xl text-black/60">
            Discount (-{computeDiscountPercentage(totalPrice, adjustedTotalPrice)}%)
          </span>
          <span className="md:text-xl font-bold text-red-600">-${Math.round(discountAmount)}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="md:text-xl text-black/60">Delivery Fee</span>
          <span className="md:text-xl font-bold">Free</span>
        </li>
        <hr className="border-t-black/10" />
        <li className="flex justify-between items-center">
          <span className="md:text-xl text-black">Total</span>
          <span className="text-xl md:text-2xl font-bold">${Math.round(adjustedTotalPrice)}</span>
        </li>
      </>
    );
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <Fragment>
            <BreadcrumbCart />
            <header className="mb-5 md:mb-6">
              <h1
                className={cn(
                  integralCF.className,
                  "font-bold text-[32px] md:text-[40px] text-black uppercase"
                )}
              >
                Your Cart
              </h1>
            </header>
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              <article className="w-full p-3.5 md:px-6 flex flex-col gap-4 md:gap-6 rounded-[20px] border border-black/10">
                {cart.items.map((item, idx) => (
                  <Fragment key={idx}>
                    <ProductCard data={item} />
                    {idx < cart.items.length - 1 && <hr className="border-t-black/10" />}
                  </Fragment>
                ))}
              </article>
              <aside className="w-full lg:max-w-[505px] p-5 md:px-6 flex flex-col gap-4 md:gap-6 rounded-[20px] border border-black/10">
                <h2 className="text-xl md:text-2xl font-bold text-black">Order Summary</h2>
                <ul className="flex flex-col gap-5">
                  {renderOrderSummary()}
                </ul>
                <div className="flex gap-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                >
                  Go to Checkout
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </aside>
            </div>
          </Fragment>
        ) : (
          <section className="flex flex-col items-center text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </section>
        )}
      </div>
    </main>
  );
}
