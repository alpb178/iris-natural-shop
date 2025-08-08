import clsx from 'clsx';

export function Container({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={clsx('mx-auto p-4 max-w-6xl', className)}>{children}</div>
  );
}
