import clsx from 'clsx';
import styles from './Loader.module.scss';
import type { LoaderProps } from './Loader.props';

export function Loader({ children, size, fullScreen }: Readonly<LoaderProps>) {
  return (
    <div
      className={clsx(
        fullScreen && 'fixed inset-0 h-dvh',
        'z-50 flex items-center justify-center w-full h-full'
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="flex flex-col justify-center items-center">
        <span
          className={clsx(
            styles.loader,
            size ? `w-${size} h-${size}` : 'w-[28px] h-[28px]'
          )}
        />

        {children}
      </div>
    </div>
  );
}
