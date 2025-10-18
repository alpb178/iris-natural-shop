import { Container } from "@/components/container";
import { Text } from "../text/Text";
import { FormattedText } from "../formatted-text";

export const FAQ = ({ heading, faqs }: { heading: string; faqs: any[] }) => {
  return (
    <Container className="flex flex-col justify-between items-center pb-20">
      <div className="z-20 relative py-10 md:pt-40">
        <Text as="title" className="mt-4 text-center" content={heading} />
      </div>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 py-20">
        {faqs &&
          faqs.map((faq: { question: string; answer: string }) => (
            <div key={faq.question} className="flex flex-col gap-2">
              <h4 className="font-bold text-foreground text-lg">
                {faq.question}
              </h4>
              <FormattedText content={faq.answer} />
            </div>
          ))}
      </div>
    </Container>
  );
};
