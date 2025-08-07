import { IconRocket } from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle
} from "../../card/Card";
import { Container } from "../../container";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { GradientContainer } from "../../gradient-container";
import { FeatureIconContainer } from "./feature-icon-container";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";

const wordToNumber: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3
};

function convertWordToNumber(word: string) {
  return wordToNumber[word.toLowerCase()] || null;
}

export const Features = ({
  heading,
  sub_heading,
  globe_card,
  ray_card,
  graph_card,
  social_media_card
}: {
  heading: string;
  sub_heading: string;
  globe_card: any;
  ray_card: any;
  graph_card: any;
  social_media_card: any;
}) => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="z-40 relative mx-auto py-20 max-w-7xl">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconRocket className="w-6 h-6 text-foreground" />
        </FeatureIconContainer>
        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="mx-auto max-w-3xl">{sub_heading}</Subheading>

        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 py-10">
          {globe_card && (
            <Card
              className={`md:col-span-${
                convertWordToNumber(globe_card?.span) || "2"
              }`}
            >
              <CardTitle>{globe_card.title}</CardTitle>
              <CardDescription>{globe_card.description}</CardDescription>
              <CardSkeletonContainer>
                <SkeletonOne />
              </CardSkeletonContainer>
            </Card>
          )}

          {ray_card && (
            <Card
              className={`md:col-span-${
                convertWordToNumber(ray_card?.span) || "1"
              }`}
            >
              <CardSkeletonContainer className="mx-auto max-w-[16rem]">
                <SkeletonTwo />
              </CardSkeletonContainer>
              <CardTitle>{ray_card.title}</CardTitle>
              <CardDescription>{ray_card.description}</CardDescription>
            </Card>
          )}

          {graph_card && (
            <Card
              className={`md:col-span-${
                convertWordToNumber(graph_card?.span) || "2"
              }`}
            >
              <CardSkeletonContainer
                showGradient={false}
                className="mx-auto max-w-[16rem]"
              >
                <SkeletonThree />
              </CardSkeletonContainer>
              <CardTitle>{graph_card.title}</CardTitle>
              <CardDescription>{graph_card.description}</CardDescription>
            </Card>
          )}

          {social_media_card && (
            <Card
              className={`md:col-span-${
                convertWordToNumber(social_media_card?.span) || "1"
              }`}
            >
              <CardSkeletonContainer showGradient={false}>
                <SkeletonFour />
              </CardSkeletonContainer>
              <CardTitle>{social_media_card.title}</CardTitle>
              <CardDescription>{social_media_card.description}</CardDescription>
            </Card>
          )}
        </div>
      </Container>
    </GradientContainer>
  );
};
