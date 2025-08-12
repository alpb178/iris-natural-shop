"use client";

import Image from "next/image";
import { Button } from "../elements/button";

export function Contacts(props: any) {
  const { Title, Description, Form, Image: image } = props;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="relative w-full h-96 mt-20 md:h-[500px]">
        <Image
          src={image.url}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-20 px-4 sm:px-6 lg:px-20 xl:px-24 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-md space-y-16">
          <h1 className="font-bold text-foreground text-4xl md:text-5xl leading-tight tracking-tight">
            {Title}
          </h1>

          <p className="text-foreground text-lg leading-relaxed">
            {Description}
          </p>

          <div className="w-full">
            <form className="space-y-6">
              {Form &&
                Form[0]?.contact?.map((input: any, index: number) => (
                  <div key={index}>
                    {input.type !== "submit" && (
                      <label
                        htmlFor={input.name}
                        className="block font-medium text-muted-foreground text-sm leading-6 mb-2"
                      >
                        {input.name}
                      </label>
                    )}

                    <div>
                      {input.type === "textarea" ? (
                        <textarea
                          rows={5}
                          id={input.name}
                          placeholder={input.placeholder}
                          className="block bg-background border border-input shadow-aceternity px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring w-full text-foreground placeholder:text-muted-foreground sm:text-sm sm:leading-6"
                        />
                      ) : input.type === "submit" ? (
                        <div>
                          <Button className="mt-6 w-full py-3 px-6 text-lg">
                            {input.name}
                          </Button>
                        </div>
                      ) : (
                        <input
                          id={input.name}
                          type={input.type}
                          placeholder={input.placeholder}
                          className="block bg-background border border-input shadow-aceternity px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring w-full text-foreground placeholder:text-muted-foreground sm:text-sm sm:leading-6"
                        />
                      )}
                    </div>
                  </div>
                ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
