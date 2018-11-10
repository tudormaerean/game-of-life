import React from 'react';
import Unit from './Unit';
import Row from './Row';
import { GameTick, gameTick } from './gameUtils/gameUtils';

const styles = require('./GameOfLife.module.scss');

interface GameOfLifeProps {
  unitSize: number;
  maxGameIterations: number;
  fillFactor: number;
}

type GameOfLifeState = GameTick & {
  gameIterations: number;
};

class GameOfLife extends React.Component<GameOfLifeProps, GameOfLifeState> {
  private parentInnerWidth: number = 0;
  private parentInnerHeight: number = 0;
  private matrixWidth: number = 0;
  private matrixHeight: number = 0;
  private animationId: number = 0;
  private gameContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: GameOfLifeProps) {
    super(props);

    this.state = {
      matrix: [[]],
      isValid: true,
      gameIterations: 0,
    };

    this.gameContainerRef = React.createRef();
  }

  componentDidMount() {
    this.getViewportDimensions();
    window.addEventListener('resize', this.windowResizeHandler);
  }

  startGame = () => {
    const { matrix, isValid, gameIterations } = this.state;
    const { maxGameIterations } = this.props;
    let nextGameTick: GameTick = {
      matrix,
      isValid,
    };
    if (gameIterations < maxGameIterations) {
      nextGameTick = gameTick(matrix);
      this.setState({
        matrix: nextGameTick.matrix,
        gameIterations: this.state.gameIterations + 1,
      }, () => this.animationId = requestAnimationFrame(this.startGame));
    } else {
      cancelAnimationFrame(this.animationId);
      this.initMatrix();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  setMatrixDimensions = () => {
    const { unitSize } = this.props;
    this.matrixWidth = Math.floor((this.parentInnerWidth) / (unitSize + 6));
    this.matrixHeight = Math.floor((this.parentInnerHeight) / (unitSize + 6));
  }

  getViewportDimensions = () => {
    if (this.gameContainerRef.current && this.gameContainerRef.current.parentElement) {
      const parentBoundingRect = this.gameContainerRef.current.parentElement.getBoundingClientRect();
      this.parentInnerHeight = parentBoundingRect.height;
      this.parentInnerWidth = parentBoundingRect.width;
      this.setMatrixDimensions();
      this.initMatrix();
    }      
  }

  initMatrix = () => {
    const { fillFactor } = this.props;
    let matrix: boolean[][] = [[]];
    for (let column = 0; column < this.matrixHeight; column++) {
      matrix[column] = [];
      for (let row = 0; row < this.matrixWidth; row++) {
        matrix[column][row] = (Math.random() < fillFactor ? true : false);
      }
    }
    this.setState({
      matrix,
      gameIterations: 0,
    }, () => this.animationId = requestAnimationFrame(this.startGame));
  }

  private generateMatrixElements = () => this.state.matrix.map((column, columnIndex) => (
    <Row key={`${columnIndex}`} unitSize={this.props.unitSize}>
      {column.map((row, rowIndex) => <Unit unitSize={this.props.unitSize} on={row} key={`${columnIndex}${rowIndex}`} />)}
    </Row>
  ));

  windowResizeHandler = () => {
    this.getViewportDimensions();
  }

  render() {
    return (
      <div className={styles.container} ref={this.gameContainerRef}>
        {this.generateMatrixElements()}
      </div>
    );
  }
}

export default GameOfLife;
