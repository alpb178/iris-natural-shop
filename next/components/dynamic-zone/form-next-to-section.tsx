"use client";

import { Button } from "@/components/button/Button";

export function FormNextToSection({
  heading,
  sub_heading,
  form,
  section,
  social_media_icon_links
}: {
  heading: string;
  sub_heading: string;
  form: any;
  section: any;
  social_media_icon_links: any;
}) {
  return (
    <div className=" mt-5  w-full min-h-screen overflow-hidden">
      <div className="mx-auto w-full mt-14 justify-center items-center max-w-md">
        <div className="mt-28 mb-10">
          <h1 className=" font-bold text-foreground text-2xl leading-9 tracking-tight">
            {heading}
          </h1>
          <p className="mt-4 max-w-sm text-foreground text-sm">{sub_heading}</p>
        </div>

        <div>
          <form className="space-y-4">
            {form &&
              form?.inputs?.map((input: any) => (
                <>
                  {input.type !== "submit" && (
                    <label
                      htmlFor="name"
                      className="block font-medium text-neutral-400 text-sm leading-6"
                    >
                      {input.name}
                    </label>
                  )}

                  <div className="mt-2">
                    {input.type === "textarea" ? (
                      <textarea
                        rows={5}
                        id="message"
                        placeholder={input.placeholder}
                        className="block bg-background border border-input shadow-sm px-4 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground sm:text-sm sm:leading-6"
                      />
                    ) : input.type === "submit" ? (
                      <div>
                        <Button className="mt-6  bg-primary text-primary-foreground">
                          {input.name}
                        </Button>
                      </div>
                    ) : (
                      <input
                        id="name"
                        type={input.type}
                        placeholder={input.placeholder}
                        className="block bg-background border border-input shadow-sm px-4 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground sm:text-sm sm:leading-6"
                      />
                    )}
                  </div>
                </>
              ))}
          </form>
        </div>
      </div>
    </div>
  );
}
