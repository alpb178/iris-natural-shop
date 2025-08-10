import { Heading } from "../elements/heading";
import Image from "next/image";

export default function RichTextRenderer({ content }: { content: any }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div>
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-4 text-foreground leading-relaxed">
                {renderChildren(block.children)}
              </p>
            );

          case "heading":
            return (
              <Heading
                key={i}
                className="mt-6 mb-3 font-bold text-foreground"
                as={`h${block.level || 2}`}
              >
                {renderChildren(block.children)}
              </Heading>
            );

          case "list":
            if (block.format === "ordered") {
              return (
                <ol key={i} className="list-decimal pl-6 mb-4">
                  {block.children.map((li: any, j: any) => (
                    <li key={j}>{renderChildren(li.children)}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={i} className="list-disc pl-6 mb-4">
                {block.children.map((li: any, j: any) => (
                  <li key={j}>{renderChildren(li.children)}</li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <Image
                  src={block.image?.url}
                  alt={block.image?.alternativeText || ""}
                  className="max-w-full h-auto"
                />
                {block.image?.caption && (
                  <figcaption className="text-sm text-foreground">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// Función para renderizar hijos con soporte de formato
function renderChildren(children: any) {
  return children.map((child: any, i: any) => {
    if (child.type === "text") {
      let textElement = child.text;
      if (child.bold) textElement = <strong key={i}>{textElement}</strong>;
      if (child.italic) textElement = <em key={i}>{textElement}</em>;
      if (child.underline) textElement = <u key={i}>{textElement}</u>;
      return textElement;
    }
    if (child.type === "link") {
      return (
        <a
          key={i}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return null;
  });
}
