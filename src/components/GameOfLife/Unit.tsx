import * as React from 'react';
import classNames from 'classnames';

const styles = require('./Unit.module.scss');

interface UnitProps {
  unitSize: number;
  on: boolean;
  text?: number;
}

const Unit = ({ on, text, unitSize }: UnitProps) => (
  <div
    className={classNames((on ? styles.on : styles.off), styles.default)}
    style={{ width: `${unitSize}px`, height: `${unitSize}px` }}
  >{text}</div>
);

export default Unit;
