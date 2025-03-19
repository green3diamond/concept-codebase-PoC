import { Html } from "@react-three/drei"

interface MeasurementsProps {
  width: number
  length: number
  height: number
  scale: number
}

export function Measurements({ width, length, height, scale }: MeasurementsProps) {
  const scaledWidth = width / scale
  const scaledLength = length / scale
  const scaledHeight = height / scale

  const Label = ({
    position,
    rotation,
    text,
  }: { position: [number, number, number]; rotation: [number, number, number]; text: string }) => (
    <Html position={position} rotation={rotation}>
      <div className="bg-white/80 px-2 py-1 rounded text-sm font-medium text-gray-800">{text}</div>
    </Html>
  )

  return (
    <group>
      <Label
        position={[0, 0.1, length / 2 + 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        text={`${scaledWidth.toFixed(2)}m`}
      />
      <Label
        position={[width / 2 + 0.1, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        text={`${scaledLength.toFixed(2)}m`}
      />
      <Label
        position={[width / 2 + 0.1, height / 2, -length / 2]}
        rotation={[0, -Math.PI / 2, 0]}
        text={`${scaledHeight.toFixed(2)}m`}
      />
    </group>
  )
}

