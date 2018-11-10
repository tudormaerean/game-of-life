import React from 'react';
import GameOfLife from '../GameOfLife';

const styles = require('./App.module.scss');

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <GameOfLife fillFactor={0.2} unitSize={10} maxGameIterations={150} />
        </div>
        <div className={styles.container}>
          <GameOfLife fillFactor={0.2} unitSize={10} maxGameIterations={100} />
        </div>
        <div className={styles.container}>
          <GameOfLife fillFactor={0.2} unitSize={10} maxGameIterations={75} />
        </div>
        <div className={styles.container}>
          <GameOfLife fillFactor={0.2} unitSize={10} maxGameIterations={50} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
