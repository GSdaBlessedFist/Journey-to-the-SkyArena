import { useEffect, useState } from 'react'
import { useInstructions } from '@/providers/InstructionsProvider'
import styles from './onscreenInstructions.module.scss'

function OnscreenInstruction({ sceneName }) {
  const { activeInstructionObj } = useInstructions()

  return (
    <>
      {activeInstructionObj && (
        <div className={styles.overlayGrid}>
          <div className={styles[activeInstructionObj.styles]}>{activeInstructionObj.instruction}</div>
        </div>
      )}
    </>
  )
}

export default OnscreenInstruction
