'use client'
import p from '../../../lib/helpers/consoleHelper'
import styles from './styles/titlePlacard.module.scss'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useEffect } from 'react'
import { usePortfolio } from '../../../providers/PortfolioProvider'

const SOURCE = 'TitlePlacard.jsx'
const srcColor = [220, 45]
export default function TitlePlacard() {
  const { state, setTimeOfDay, goToHangar } = usePortfolio()

  
  

  return (
    <div className={styles.sceneWrapper}>
      <div className={styles.sceneGrid}>
        <div></div>
        <div className={styles.placardSection}>
          <div></div>
          <div className={styles.placardContainer}>
            {/* ROW1 */}
            <div className={styles.rows}>
              <div className={`${styles.titleBig} ${styles.leftSide}`}>Journey</div>
              <div className={styles.iconContainer}>
                <button onClick={() => setTimeOfDay('day')}>
                  <IoSunny size='5.6rem' color='white' />
                </button>
              </div>
            </div>

            {/* ROW2 */}
            <div className={styles.rows}>
              <div className={`${styles.titleSmall} ${styles.leftSide}`}>To The</div>
              <div className={styles.iconContainer}>
                <button onClick={() => setTimeOfDay('night')}>
                  <IoMoon size='4.6rem' color='white' />
                </button>
              </div>
            </div>

            {/* ROW3 */}
            <div className={styles.rows}>
              <div className={`${styles.titleBig} ${styles.leftSide}`}>Sky Arena</div>
              <div className={styles.iconContainer}></div>
            </div>

            {/* ROW4 */}
            <div className={styles.rows}>
              <div className={`${styles.titleBig} ${styles.leftSide}`}></div>
              <div className={styles.iconContainer}>
                <button className='cursor-pointer' onClick={goToHangar}>
                  <div data-word='begin' className={styles.beginButton}>
                    <div className={styles.beginText}>begin</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
