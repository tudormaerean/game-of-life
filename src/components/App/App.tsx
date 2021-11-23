import React from 'react';
import GameOfLife from '../GameOfLife';

const styles = require('./App.module.scss');

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <GameOfLife fillFactor={0.2} unitSize={15} maxGameIterations={200} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
