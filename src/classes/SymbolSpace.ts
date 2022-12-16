import * as Pixi from 'pixi.js'
import { app } from '~/core'

type InitProps = {
  x?: number
  y?: number
  symbolAssets?: Pixi.Texture[]
}

/**
 * Game Symbol
 */
export default class SymbolSpace extends Pixi.Container {
  public static readonly SPACE_WIDTH = 160
  public static readonly SPACE_HEIGHT = 100

  private _assets: Pixi.Texture[]
  private _currentSymbol: Pixi.Sprite
  private _nextSymbol: Pixi.Sprite
  private defaultSpeed = 30
  private speed = 0
  private targetSpeed = 0
  private state: 'stop' | 'roll' = 'stop'

  constructor(props: InitProps) {
    super()
    this.x = props.x || 0
    this.y = props.y || 0
    this.width = SymbolSpace.SPACE_WIDTH
    this.height = SymbolSpace.SPACE_HEIGHT
    this._assets = props.symbolAssets || []

    const currentSymbol = this.updateSymbol()
    currentSymbol.y = 0
    currentSymbol.name = 'current'
    this.addChild(currentSymbol)

    const nextSymbol = this.updateSymbol()
    nextSymbol.y = SymbolSpace.SPACE_HEIGHT * -1
    nextSymbol.name = 'next'
    this.addChild(nextSymbol)

    this._currentSymbol = currentSymbol
    this._nextSymbol = nextSymbol

    const mask = new Pixi.Graphics()
    mask.beginFill(0xffffff)
    console.log(0, 0, SymbolSpace.SPACE_WIDTH, SymbolSpace.SPACE_HEIGHT)
    mask.drawRect(0, 0, SymbolSpace.SPACE_WIDTH, SymbolSpace.SPACE_HEIGHT)
    mask.endFill()
    mask.name = 'mask'
    this.mask = mask
    this.addChild(mask)
  }

  public get getSpeed() {
    return this.speed
  }

  public updateSymbol() {
    const symbol = new Pixi.Sprite()
    const randomIndex = Math.floor(Math.random() * this._assets.length)
    symbol.texture = this._assets[randomIndex].clone()
    return symbol
  }

  private update = app.ticker.add(() => {
    if (this.speed === 0) return

    const position = this._currentSymbol.y + this.speed - SymbolSpace.SPACE_HEIGHT

    if (position >= 0) {
      this._currentSymbol.texture = this._nextSymbol.texture
      this._nextSymbol.texture = this._assets[Math.floor(Math.random() * this._assets.length)]
    }

    this._currentSymbol.y = position >= 0 ? position : this._currentSymbol.y + this.speed

    this._nextSymbol.y =
      position >= 0 ? SymbolSpace.SPACE_HEIGHT * -1 + position : this._nextSymbol.y + this.speed
  })

  public roll() {
    const blur = new Pixi.filters.BlurFilter()
    blur.blurX = 0
    blur.blurY = this.speed * 1
    this.filters = [blur]
    this.speed = this.defaultSpeed
  }

  public stop(stopIndex: number) {
    this.filters = []
    this._currentSymbol.texture = this._assets[stopIndex]
    this._currentSymbol.y = 0
    this._nextSymbol.y = SymbolSpace.SPACE_HEIGHT * -1
    this.speed = 0
  }

  public get getRandomSymbol() {
    return Math.floor(Math.random() * this._assets.length)
  }
}
