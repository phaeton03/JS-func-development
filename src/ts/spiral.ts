class Level {
  private readonly arrayLengthX: number;
  private readonly arrayLengthY: number;
  public levelsX: number[];
  public levelsY: number[];

  public constructor(lengthX: number, lengthY: number) {
    this.arrayLengthX = lengthX;
    this.arrayLengthY = lengthY;
    this.levelsX = [-1, lengthX];
    this.levelsY = [-1, lengthY];
  }

  public levelChange() {
    ++this.levelsX[0];
    --this.levelsX[1];
    ++this.levelsY[0];
    --this.levelsY[1];
  }

  public levelEnd(): boolean {
    console.log(this.levelsX, this.levelsY);
    return this.levelsX[0] >= this.levelsX[1] || this.levelsY[0] >= this.levelsY[1];
  }
}

class Direction {
  private directions: Position[] = [
    new Position(1, 0, null),
    new Position(0, 1, null),
    new Position(-1, 0, null),
    new Position(0, -1, null)
  ];

  private currentDir: number = 0;
  private rotateNumber: number = 4;

  public getStartPos() {
    return this.directions[0];
  }

  public turnRight(): Position {
    this.currentDir = (++this.currentDir) % this.directions.length;

    return this.directions[this.currentDir];
  }
}

class Position {
  private x: number = 0;
  private y: number = 0;
  private nextPosition: Position;
  private level: Level;
  private direction: Direction;
  private startPosition = [this.x, this.y];

  constructor(x: number = 0, y: number = 0, nextPosition: Position, direction?: Direction, level?: Level) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.direction = direction;
    this.nextPosition = nextPosition;
  }

  public next(): number[] {
    let prevX = this.x;
    let prevY = this.y;

    this.x = this.x + this.nextPosition.x;
    this.y = this.y + this.nextPosition.y;

    if (prevX === this.startPosition[1] && prevY === this.startPosition[0] + 1) {
      this.level.levelChange();
      ++this.startPosition[0];
      ++this.startPosition[1];
    }

    if ((this.level.levelsX.includes(this.x) || this.level.levelsY.includes(this.y))) {
      this.x = prevX;
      this.y = prevY;
      this.nextPosition = this.direction.turnRight();
      this.next();
    }

    return [this.y, this.x];
  }
}

function spiral(twoDimArr: number[][]): number[] {
  let result: number[] = [];
  const level = new Level(twoDimArr[0].length, twoDimArr.length);
  const direction = new Direction();
  const position = new Position(-1, 0, direction.getStartPos(), direction, level);
  let counter = twoDimArr.length * twoDimArr[0].length;

  while (counter > 0) {
    let [x, y] = position.next();
    result.push(twoDimArr[x][y]);
    --counter;
  }

  console.log(result);

  return result;
}

spiral([
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19]
]); // [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]


