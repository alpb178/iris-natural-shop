"use client";

import Image from "next/image";

export function StoryPanel(props: any) {
  const { storys: data } = props;

  return (
    <div className="bg-background w-full text-foreground">
      {data &&
        data?.map((item: any, index: number) => {
          // Determine layout based on index: 0=left, 1=right, 2=below, then repeat
          const layoutType = index % 3;

          if (layoutType === 0) {
            // Image on the left
            return (
              <section key={index} className="py-20 lg:py-32">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                      {item.image && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alternativeText}
                          width={550}
                          height={550}
                          className="rounded-2xl"
                        />
                      )}
                    </div>
                    <div className="order-1 lg:order-2">
                      <h1 className="mb-6 font-bold text-4xl">{item.tittle}</h1>
                      <p className="text-foreground/70 text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          } else if (layoutType === 1) {
            // Image on the right (original layout)
            return (
              <section key={index} className="py-20 lg:py-32">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
                    <div>
                      <h1 className="mb-6 font-bold text-4xl lg:text-6xl leading-tight">
                        {item.tittle}
                      </h1>
                      <p className="text-muted-foreground text-xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div>
                      {item.image && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alternativeText}
                          width={550}
                          height={550}
                          className="rounded-2xl"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          } else {
            // Image below
            return (
              <section key={index} className="py-20 lg:py-32">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <div className="mb-12 text-center">
                    <h1 className="mb-6 font-bold text-4xl lg:text-6xl leading-tight">
                      {item.tittle}
                    </h1>
                    <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {item.image && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alternativeText}
                        width={550}
                        height={550}
                        className="rounded-2xl"
                      />
                    )}
                  </div>
                </div>
              </section>
            );
          }
        })}
    </div>
  );
}
