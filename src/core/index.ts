import * as Pixi from 'pixi.js'
import { align } from '~/utils/position'

const width = 1280
const height = 720

export const app = new Pixi.Application({
  width,
  height,
})

export const core = () => {
  const title = new Pixi.Text('Hello world', { fill: '#fff' })

  title.position.set(align(title, { x: 'center' }).x, align(title, { y: 'center' }).y)
  app.stage.addChild(title)
}

const resizeApp = () => {
  const ratio = window.innerWidth / width

  app.stage.scale.x = app.stage.scale.y = ratio

  app.renderer.resize(width * ratio, height * ratio)
}

window.addEventListener('resize', resizeApp)

const init = () => {
  resizeApp()
}

init()

export default core
