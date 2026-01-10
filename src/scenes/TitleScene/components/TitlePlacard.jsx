'use client'
import p from '../../../lib/imported_utilities/helpers/consoleHelper'
import styles from './styles/titlePlacard.module.scss'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { useEffect } from 'react'
import { PortfolioActorContext } from '@/actors/PortfolioActorContext'

const SOURCE = 'TitlePlacard.jsx off'
const srcColor = [220, 45]
export default function TitlePlacard() {
  const portfolioState = PortfolioActorContext.useSelector(state=>state);
  const portfolioActor = PortfolioActorContext.useActorRef();
  
  p(SOURCE, 14, srcColor, portfolioActor, 'portfolioActor')

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
                <button
                  onClick={() =>
                    portfolioActor.send({
                      type: 'SET_TIME_OF_DAY',
                      timeOfDay: 'day',
                    })
                  }
                >
                  <IoSunny size='5.6rem' color='white' />
                </button>
              </div>
            </div>

            {/* ROW2 */}
            <div className={styles.rows}>
              <div className={`${styles.titleSmall} ${styles.leftSide}`}>To The</div>
              <div className={styles.iconContainer}>
                <button
                  onClick={() =>
                    portfolioActor.send({
                      type: 'SET_TIME_OF_DAY',
                      timeOfDay: 'night',
                    })
                  }
                >
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
                <button
                  className='cursor-pointer'
                  onClick={() =>
                    portfolioActor.send({
                      type: 'SKIP_INTRO'
                    })
                  }
                >
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
