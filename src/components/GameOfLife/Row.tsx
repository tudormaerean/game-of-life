import * as React from 'react';

const styles = require('./Row.module.scss');

interface RowProps {
  unitSize: number;
  children: JSX.Element[];
}

const Row = ({ children, unitSize }: RowProps) => (
  <div className={styles.row} style={{ height: `${unitSize + 4}px` }}>{children}</div>
);

export default Row;
