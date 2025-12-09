import { useInstruction } from "@/providers/InstructionProvider";
import { Html } from "@react-three/drei";

function OnscreenInstruction({ scene }) {
  const { instruction } = useInstruction()

  return (
    <>
      <div>
        <div className='text-white text-xl'>{instruction}</div>
      </div>
    </>
  )
}

export default OnscreenInstruction;