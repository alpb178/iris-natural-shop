"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { usePageLoaded } from "@/hooks/usePageLoaded";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../button/Button";
import { TextInput } from "../form/text-input/TextInput";
import { Text } from "../text/Text";
import { socials } from "./socials";

export function FormNextToSection({
  heading,
  sub_heading,
  form,
  section,
  social_networks,
  ...props
}: {
  heading: string;
  sub_heading: string;
  form: any;
  section: any;
  social_networks: any;
}) {
  const { isPageLoaded } = usePageLoaded();

  // Create validation rules for each input
  const getValidationRules = (input: any) => {
    const rules: Record<string, any> = {};

    if (input.required) {
      rules.required = {
        value: true,
        message: `${input.label || input.name} is required`
      };
    }

    // Add type-specific validation
    if (input.type === "email") {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      };
    }

    if (input.type === "tel") {
      rules.pattern = {
        value: /^[\+]?[1-9][\d]{0,15}$/,
        message: "Invalid phone number"
      };
    }

    return rules;
  };

  const methods = useForm();

  const onSubmit = (data: any) => {
    // TODO: Implement form submission
    console.log(data);
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 w-full min-h-screen overflow-hidden">
      <div className="z-20 relative flex lg:flex-none justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24 py-4 lg:py-40 w-full">
        <div
          className={cn(
            "mx-auto w-full max-w-md transition-all duration-700 ease-out transform",
            isPageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          )}
        >
          <div>
            <Text as="title" content={heading} />

            <Text
              className="mt-4 max-w-sm text-foreground/60"
              content={sub_heading}
            />
          </div>

          <div className="py-10">
            <div>
              <FormProvider {...methods}>
                <form
                  className="space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  {form &&
                    form?.inputs?.map((input: any) => (
                      <div className="mt-4" key={input?.name}>
                        {input?.type === "textarea" ? (
                          <TextInput
                            as="textarea"
                            name={input.name}
                            label={input.label}
                            placeholder={input.placeholder}
                            required={input.required}
                            validation={getValidationRules(input)}
                          />
                        ) : input?.type === "submit" ? (
                          <div className="flex justify-end items-center">
                            <Button
                              className="mt-6"
                              label={input.label}
                              type="submit"
                            />
                          </div>
                        ) : (
                          <TextInput
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            placeholder={input.placeholder}
                            required={input.required}
                            validation={getValidationRules(input)}
                          />
                        )}
                      </div>
                    ))}
                </form>
              </FormProvider>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 py-4">
            {social_networks?.map((social: any) => (
              <Link href={social.link.URL} target="_blank" key={social.alias}>
                {socials[social.name as keyof typeof socials]?.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden z-20 relative md:flex justify-center items-center bg-background border-border border-l w-full overflow-hidden">
        {/* <StarBackground />
        <ShootingStars /> */}
        <div className="mx-auto max-w-sm">
          <div className="flex flex-row justify-center items-center mb-10 w-full">
            <AnimatedTooltip items={section.users} />
          </div>
          <p
            className={
              "font-semibold text-xl text-center  text-foreground/90 text-balance"
            }
          >
            {section.heading}
          </p>
          <p
            className={
              "font-normal text-base text-center text-foreground/60  mt-8 text-balance"
            }
          >
            {section.sub_heading}
          </p>
        </div>
      </div>
    </div>
  );
}
