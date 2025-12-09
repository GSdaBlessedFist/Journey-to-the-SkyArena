import { useInstruction } from "@/providers/InstructionsProvider";
import { Html } from "@react-three/drei";

function OnscreenInstruction({ sceneName }) {
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