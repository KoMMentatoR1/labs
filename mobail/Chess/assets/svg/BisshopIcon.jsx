import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BisshopIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" {...props}>
    <Path fill={props.color === 'w' ? '#ffffff': '#000000'} d="M8 287.88c0 51.64 22.14 73.83 56 84.6V416h192v-43.52c33.86-10.77 56-33 56-84.6 0-30.61-10.73-67.1-26.69-102.56L185 285.65a8 8 0 0 1-11.31 0l-11.31-11.31a8 8 0 0 1 0-11.31L270.27 155.1c-20.8-37.91-46.47-72.1-70.87-92.59C213.4 59.09 224 47.05 224 32a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32c0 15 10.6 27.09 24.6 30.51C67.81 106.8 8 214.5 8 287.88zM304 448H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
  </Svg>
)
export default BisshopIcon
