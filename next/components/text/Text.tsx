import { cn } from "@/lib/utils";
import styles from "./Text.module.scss";
import type { TextProps } from "./Text.props";

interface TextVariants {
  title: "h1";
  subtitle: "h2";
  heading: "h3";
  helper: "caption";
  text: "p";
  error: "caption";
  label: "label";
}

const variants: TextVariants = {
  title: "h1",
  subtitle: "h2",
  heading: "h3",
  helper: "caption",
  text: "p",
  error: "caption",
  label: "label"
};

export function Text(props: Readonly<TextProps>) {
  const { as = "text", className, content, children } = props;

  const Parent = (as ? variants[as as keyof typeof variants] : "p") as
    | "h1"
    | "h2"
    | "p"
    | "label"
    | "caption";

  const classNames = cn(styles.text, props.as && styles[props.as], className);

  return <Parent className={classNames}>{content || children}</Parent>;
}
