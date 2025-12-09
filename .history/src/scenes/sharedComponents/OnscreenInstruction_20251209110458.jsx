import { useInstruction } from "@/providers/InstructionProvider";
import { Html } from "@react-three/drei";

function OnscreenInstruction({ scene }) {
  const { instruction } = useInstruction()

  return (
    <Html center>
      <div className='text-white text-xl'>{instruction}</div>
    </Html>
  )
}

export default OnscreenInstruction;