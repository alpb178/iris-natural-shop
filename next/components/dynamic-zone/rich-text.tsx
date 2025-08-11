"use client";

import { Heading } from "../elements/heading";

import RichTextRenderer from "../rich-text";

export const RichText = (props: any) => {
  const { text_description: data } = props;

  return (
    <div className="relative w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {data &&
              data?.map((item: any, index: number) => (
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
