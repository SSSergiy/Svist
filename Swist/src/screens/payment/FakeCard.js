import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function FakeCard(props) {
  return (
    <Svg
      width={342}
      height={192}
      viewBox="0 0 342 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={342} height={192} rx={24} fill={props.prevFill} />
    </Svg>
  )
}

export default FakeCard
