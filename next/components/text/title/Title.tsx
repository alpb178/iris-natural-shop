import { Text } from '../Text';

export function Title({ content }: Readonly<{ content: string }>) {
  return <Text variant="h1" content={content} />;
}
