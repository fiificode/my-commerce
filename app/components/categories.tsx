"use client";
import React, { useState, useEffect } from "react";

import { getCategories } from "@/actions/product";
import { BentoGrid, BentoGridItem } from "./bento-grid";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: {
    src: string;
  };
}

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  header: string;
  className: string;
  href: string;
}

export function FeaturedCategories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        const items: CategoryItem[] = categoryData.map(
          (category: Category, index: number) => ({
            id: category.id,
            title: category.name,
            description: category.description || "",
            header: category.image?.src || "/placeholder.png",
            className:
              index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1",
            href: `/category/${category.id}`,
          })
        );
        setCategories(items);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <BentoGrid className="max-w-8xl mx-auto md:auto-rows-[20rem]">
        {loading
          ? // Show skeleton loaders while loading
            Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={
                    i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                  }
                >
                  <Skeleton />
                </div>
              ))
          : // Show actual posts when loaded
            categories.map((item) => (
              <BentoGridItem
                key={item.id}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                href={item.href}
              />
            ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.8] bg-gray-300 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.8] bg-neutral-100 dark:bg-black"></div>
);
