import { useInstructions } from "@/providers/InstructionsProvider";
import { Html } from "@react-three/drei";

function OnscreenInstruction({ sceneName }) {
  const { activeInstruction } = useInstructions()

  

  return (
    <>
      <div>
        <div className='text-white text-xl'>{activeInstruction}</div>
      </div>
    </>
  )
}

export default OnscreenInstruction;