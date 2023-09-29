import "@johnlindquist/kit"

// Menu: Resize and Center App
// Description: Resize and center the frontmost app
// Author: Ryan Mackey
// Twitter: @ReadOnlyMackey

const sixteenByTen = [
  '2560x1600',
  '1920x1200',
  '1680x1050',
  '1440x900',
  '1280x800',
  '960x600',
  '640x400',
]

const sixteenByNine = [
  '3840x2160',
  '2560x1440',
  '1920x1080',
  '1600x900',
  '1366x768',
  '1280x720',
  '1152x648',
  '1024x576',
]

const fourByThree = [
  '2048x1536',
  '1920x1440', 
  '1856x1392', 
  '1600x1200', 
  '1440x1080', 
  '1400x1050', 
  '1280x960', 
  '1024x768', 
  '960x720', 
  '800x600', 
  '640x480', 
]

const { workArea, bounds } = await getActiveScreen()

const { x, y } = bounds

const config = [
  {
    prefix: '16:10',
    values: sixteenByTen
  },
  {
    prefix: '16:9',
    values: sixteenByNine
  },
  {
    prefix: '4:3',
    values: fourByThree
  },
]

const args = config.map(({ prefix, values }) => {
  return values.map(value => {
    const [width, height] = value.split('x');

    return {
      name: `(${prefix}) ${value}`,
      value: {
        width: Number(width),
        height: Number(height),
      }
    }
  })
}).flat()

const { height, width } = await arg('Select an aspect ratio', args);

const xOffset = (workArea.width - width) / 2;
const yOffset = (workArea.height - height) / 2;

const top = y + yOffset
const left = x + xOffset
const right = x + width + xOffset
const bottom = y + height + yOffset

await applescript(`
  tell application "System Events"
    tell process "Kit" to set its visible to false
  end tell
`);

setActiveAppBounds({ top, left, right, bottom })