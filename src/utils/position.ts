import { ObservablePoint, Text } from 'pixi.js'
import { app } from '~/core'

type Position = 'center' | 'start' | 'end'
type AlignProps = {
  x?: Position
  y?: Position
}
export const align = (context: Text, { x, y }: AlignProps) => {
  const calcX = () => {
    if (x === 'center') return (app.view.width - context.width) / 2

    return 0
  }

  const calcY = () => {
    if (y === 'center') return (app.view.height - context.height) / 2
    return 0
  }

  return { x: calcX(), y: calcY() }
}
