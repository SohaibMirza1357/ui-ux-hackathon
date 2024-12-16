"use client";

import React from "react";
import { PiTrashFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "@/components/ui/CartCounter";
import { Button } from "../ui/button";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  // Remove item from cart
  const handleRemoveItem = () => {
    dispatch(
      remove({
        id: data.id,
        attributes: data.attributes,
        quantity: data.quantity,
      })
    );
  };

  // Add item to cart with quantity 1
  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }));
  };

  // Adjust quantity or remove item if quantity is 1
  const handleRemoveFromCart = () => {
    if (data.quantity === 1) {
      dispatch(
        remove({
          id: data.id,
          attributes: data.attributes,
          quantity: data.quantity,
        })
      );
    } else {
      dispatch(
        removeCartItem({ id: data.id, attributes: data.attributes })
      );
    }
  };

  // Calculate price with or without discounts
  const getPrice = () => {
    if (data.discount.percentage > 0) {
      return Math.round(
        data.price - (data.price * data.discount.percentage) / 100
      );
    } else if (data.discount.amount > 0) {
      return data.price - data.discount.amount;
    }
    return data.price;
  };

  // Generate discount elements
  const renderDiscount = () => {
    if (data.discount.percentage > 0 || data.discount.amount > 0) {
      return (
        <>
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            ${data.price}
          </span>
          {data.discount.percentage > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-${data.discount.percentage}%`}
            </span>
          )}
          {data.discount.amount > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-$${data.discount.amount}`}
            </span>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex items-start space-x-4">
      <Link
        href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
        className="bg-[#F0EEED] rounded-lg w-full min-w-[100px] max-w-[100px] sm:max-w-[124px] aspect-square overflow-hidden"
      >
        <Image
          src={data.srcUrl}
          width={124}
          height={124}
          className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.name}
          priority
        />
      </Link>
      <div className="flex w-full self-stretch flex-col">
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
            className="text-black font-bold text-base xl:text-xl"
          >
            {data.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-9 md:w-9"
            onClick={handleRemoveItem}
          >
            <PiTrashFill className="text-xl md:text-2xl text-red-600" />
          </Button>
        </div>
        <div className="-mt-1">
          <span className="text-black text-xs md:text-sm mr-1">Size:</span>
          <span className="text-black/60 text-xs md:text-sm">{data.attributes[0]}</span>
        </div>
        <div className="mb-auto -mt-1.5">
          <span className="text-black text-xs md:text-sm mr-1">Color:</span>
          <span className="text-black/60 text-xs md:text-sm">{data.attributes[1]}</span>
        </div>
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center space-x-[5px] xl:space-x-2.5">
            <span className="font-bold text-black text-xl xl:text-2xl">
              ${getPrice()}
            </span>
            {renderDiscount()}
          </div>
          <CartCounter
            initialValue={data.quantity}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            isZeroDelete
            className="px-5 py-3 max-h-8 md:max-h-10 min-w-[105px] max-w-[105px] sm:max-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
