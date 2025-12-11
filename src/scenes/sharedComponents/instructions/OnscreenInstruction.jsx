import { useEffect, useState } from 'react'
import { useInstructions } from '@/providers/InstructionsProvider'
import styles from './onscreenInstructions.module.scss'
import p from '@/lib/helpers/consoleHelper'


const SOURCE = 'OnscreenInstruction.jsx off'
const srcColor = [205, 35]

function OnscreenInstruction({ sceneName }) {
  const { activeInstructionObj } = useInstructions()

  const contentClass = activeInstructionObj?.fadeOut === true
    ? styles[activeInstructionObj.content_style + '_fadeOut']
    : styles[activeInstructionObj.content_style]


  useEffect(() => {
    p(SOURCE, 14, srcColor, activeInstructionObj, 'activeInstructionObj:')
  }, [activeInstructionObj])

  

  return (
    <>
      {activeInstructionObj?.instruction && (
        <div className={styles.overlayGrid}>
          <div className={styles[activeInstructionObj.position_style]}>
            <div className={contentClass}>{activeInstructionObj.instruction}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default OnscreenInstruction
