"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll";
import { IconRocket } from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { FeatureIconContainer } from "./features/feature-icon-container";
import RichTextRenderer from "../rich-text";

export const PrivacyPolicy = (props: any) => {
  const { policys } = props;

  return (
    <div className="relative w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {policys &&
              policys?.map((item: any, index: number) => (
                <div key={index} className="mb-8">
                  <Heading className="text-left mb-4">{item.tittle}</Heading>
                  <div className="text-left text-foreground leading-relaxed">
                    <RichTextRenderer content={item.description} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
