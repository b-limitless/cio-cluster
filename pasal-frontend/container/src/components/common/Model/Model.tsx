import React, {ReactNode, forwardRef} from 'react';
import styles from './model.module.scss';

type Props = {
    children: ReactNode;
    ref:any;
}

const Model = forwardRef<HTMLDivElement, Props>(({children}, ref) => {
  return (
    <div className={styles.model}>
        <div className={styles.items} ref={ref}>
            {children}
        </div>
    </div>
  )
});

export default Model;