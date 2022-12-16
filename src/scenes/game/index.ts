import * as Pixi from 'pixi.js'
import BaseScene from '~/classes/BaseScene'
import SymbolSpace from '~/classes/SymbolSpace'

class Game extends BaseScene {
  /**
   * [row: [col]]
   */
  protected spaces: SymbolSpace[][] = []
  protected row = 3
  protected col = 5

  constructor() {
    super('game')
  }

  async run() {
    await this.load(['symbol'])
    // シンボルスペースの配置
    this.spaces = [...Array(this.row)].map((_, rowIndex) => {
      return [...Array(this.col)].map((_, colIndex) => {
        const space = new SymbolSpace({
          x: colIndex * SymbolSpace.SPACE_WIDTH,
          y: rowIndex * SymbolSpace.SPACE_HEIGHT,
          symbolAssets: Object.values(this.assets.symbol),
        })
        this.app.stage.addChild(space as Pixi.Container)
        space.roll()
        return space
      })
    })

    setInterval(() => {
      this.spaces.map((rows) =>
        rows.map((space) => {
          if (space.getSpeed) {
            space.stop(space.getRandomSymbol)
            return
          }

          space.roll()
        }),
      )
    }, 3000)
    return
  }
}

export default Game
