import * as Pixi from 'pixi.js'
import { Bundle } from '~/types/core'
import { app } from '~/core'

class BaseScene {
  protected app = app
  protected sceneName: string
  protected assets: Record<string, Record<string, Pixi.Texture>> = {}
  protected container: Pixi.Container

  constructor(sceneName: string) {
    this.sceneName = sceneName
    console.log('sceneName', this.sceneName)
    this.container = new Pixi.Container()
  }

  async load(bundleName: Bundle[]) {
    this.assets = await Pixi.Assets.loadBundle(bundleName)
  }

  /**
   * Scene Start
   */
  run() {
    return
  }
}

export default BaseScene
