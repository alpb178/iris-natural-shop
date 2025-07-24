import clsx from 'clsx';
import { TextConstants } from './Text.constants';
import styles from './Text.module.scss';
import type { TextProps } from './Text.props';

export function Text(props: Readonly<TextProps>) {
  const { variant = 'p', className, content, children } = props;

  const Parent = variant === 'error' ? 'label' : variant;

  const classNames = clsx(
    styles.text,
    props.as && styles[props.as],
    variant === TextConstants.ERROR_CLASSNAME
      ? styles[TextConstants.ERROR_CLASSNAME]
      : null,
    className
  );

  return <Parent className={classNames}>{content || children}</Parent>;
}
