"use client";

import { cn } from "@/lib/utils";
import { IconCheck, IconPlus, IconReceipt2 } from "@tabler/icons-react";
import React from "react";
import { Button } from "../button/Button";
import { Container } from "../container";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { FeatureIconContainer } from "./features/feature-icon-container";

type Perks = {
  [key: string]: string;
};

type CTA = {
  [key: string]: string;
};

type Plan = {
  name: string;
  price: number;
  perks: Perks[];
  additional_perks: Perks[];
  description: string;
  number: string;
  featured?: boolean;
  CTA?: CTA | undefined;
};

export const Pricing = ({
  heading,
  sub_heading,
  plans
}: {
  heading: string;
  sub_heading: string;
  plans: any[];
}) => {
  const onClick = (plan: Plan) => {
    console.log("click", plan);
  };

  return (
    <div className="pt-40">
      <Container>
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconReceipt2 className="w-6 h-6 text-foreground" />
        </FeatureIconContainer>
        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="mx-auto max-w-3xl">{sub_heading}</Subheading>
        <div className="lg:items-start gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto py-20 max-w-7xl">
          {plans.map((plan) => (
            <Card onClick={() => onClick(plan)} key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const Card = ({ plan, onClick }: { plan: Plan; onClick: () => void }) => {
  return (
    <div
      className={cn(
        "bg-card p-4 md:p-4 border-2 border-border rounded-3xl",
        plan.featured && "border-primary bg-background"
      )}
    >
      <div
        className={cn(
          "bg-muted shadow-[0px_-1px_0px_0px_var(--neutral-700)] p-4 rounded-2xl",
          plan.featured && "bg-background shadow-aceternity"
        )}
      >
        <div className="flex justify-between items-center">
          <p
            className={cn(
              "font-medium text-card-foreground",
              plan.featured && "text-foreground"
            )}
          >
            {plan.name}
          </p>
          {plan.featured && (
            <div
              className={cn(
                "relative bg-muted px-3 py-1 rounded-full font-medium text-muted-foreground text-xs"
              )}
            >
              <div className="bottom-0 absolute inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto w-3/4 h-px"></div>
              Featured
            </div>
          )}
        </div>
        <div className="mt-8">
          {plan.price && (
            <span
              className={cn(
                "font-bold text-muted-foreground text-lg",
                plan.featured && "text-muted-foreground"
              )}
            >
              $
            </span>
          )}
          <span
            className={cn(
              "font-bold text-card-foreground text-4xl",
              plan.featured && "text-foreground"
            )}
          >
            {plan.price || plan?.CTA?.text}
          </span>
          {plan.price && (
            <span
              className={cn(
                "ml-2 font-normal text-muted-foreground text-lg",
                plan.featured && "text-muted-foreground"
              )}
            >
              / launch
            </span>
          )}
        </div>
        <Button
          variant="outline"
          className={cn(
            "mt-10 mb-4 w-full",
            plan.featured &&
              "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
          )}
          onClick={onClick}
        >
          {plan?.CTA?.text}
        </Button>
      </div>
      <div className="mt-1 p-4">
        {plan.perks.map((feature, idx) => (
          <Step featured={plan.featured} key={idx}>
            {feature.text}
          </Step>
        ))}
      </div>
      {plan.additional_perks && plan.additional_perks.length > 0 && (
        <Divider featured={plan.featured} />
      )}
      <div className="p-4">
        {plan.additional_perks?.map((feature, idx) => (
          <Step featured={plan.featured} additional key={idx}>
            {feature.text}
          </Step>
        ))}
      </div>
    </div>
  );
};

const Step = ({
  children,
  additional,
  featured
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  return (
    <div className="flex justify-start items-start gap-2 my-4">
      <div
        className={cn(
          "flex flex-shrink-0 justify-center items-center bg-neutral-700 mt-0.5 rounded-full w-4 h-4",
          additional ? "bg-indigo-600" : "bg-neutral-700"
        )}
      >
        <IconCheck className="w-3 h-3 text-neutral-300 [stroke-width:4px]" />
      </div>
      <div
        className={cn(
          "font-medium text-card-foreground text-sm",
          featured && "text-foreground"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Divider = ({ featured }: { featured?: boolean }) => {
  return (
    <div className="relative">
      <div className={cn("bg-border w-full h-px", featured && "bg-border")} />
      <div
        className={cn("bg-border/50 w-full h-px", featured && "bg-border/50")}
      />
      <div
        className={cn(
          "absolute inset-0 flex justify-center items-center bg-muted shadow-[0px_-1px_0px_0px_var(--neutral-700)] m-auto rounded-xl w-5 h-5",
          featured && "bg-background shadow-aceternity"
        )}
      >
        <IconPlus
          className={cn(
            "w-3 h-3 text-muted-foreground [stroke-width:4px]",
            featured && "text-foreground"
          )}
        />
      </div>
    </div>
  );
};
