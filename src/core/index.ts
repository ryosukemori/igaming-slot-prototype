import * as Pixi from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import config from '~/core/config'
import manifest from '~/resources/manifest.json'
import Game from '~/scenes/game'

const width = config.width
const height = config.height

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(Pixi)

export const app = new Pixi.Application({
  width,
  height,
})

const resizeApp = () => {
  const ratioX = window.innerWidth / width
  const ratioY = window.innerHeight / height
  const ratio = ratioX < ratioY ? ratioX : ratioY

  app.stage.scale.x = app.stage.scale.y = ratio

  app.renderer.resize(width * ratio, height * ratio)
}

window.addEventListener('resize', resizeApp)

const init = () => {
  resizeApp()
}

init()

export const core = () => {
  init()

  const bundles = manifest.bundles.map((bundle) => {
    return {
      ...bundle,
      assets: bundle.assets.map((asset) => ({
        ...asset,
        srcs: `${config.assetsPath}/${bundle.name}/${asset.srcs}`,
      })),
    }
  })
  Pixi.Assets.init({ manifest: { bundles } })

  const game = new Game()
  game.run()
}

export default core
