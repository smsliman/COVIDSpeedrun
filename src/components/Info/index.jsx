import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import firebase from '../../firebase.js'

import styles from './info.module.scss'

const Info = ({ setShowInput, setShowInfo }) => {
  const [anyButtonActive, setAnyButtonActive] = useState(true)
  const [endButtonActive, setEndButtonActive] = useState(false)

  const handleEndClick = () => {
    setAnyButtonActive(false)
    setEndButtonActive(true)
  }
  const handleAnyClick = () => {
    setAnyButtonActive(true)
    setEndButtonActive(false)
  }

  return (
    <div>
      <Container id='mainContainer'>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.mainTitle}>
              Welcome to the Covid Test Speedrunning Leaderboard!
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.secondaryTitle}>The rules are simple:</div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.ternaryTitle}>
              &#8226;There are two categories, with the details of each listed
              below.
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.ternaryTitle}>
              &#8226;Time yourself according to the rules of one of the
              categories, then enter your name and time on the next page.
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.ternaryTitle}>
              &#8226;Finally, you have the option to upload a video to verify
              your time and be placed on a special "Verified" leaderboard.
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.ternaryTitle}>
              &#8226;While doing this, you must do your test properly, follow
              the rules of the rec center, and respect all rec center employees.
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.ternaryTitle}>
              &#8226;Disrepectful behavior or an inconclusive test result will
              disqualify your time.
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <button
              className={
                anyButtonActive ? styles.anyButtonActive : styles.anyButton
              }
              onClick={() => handleAnyClick()}
            >
              <table>
                <tr>
                  <td>
                    <div className={styles.ternaryTitle}>Any-Per-Spit</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.smallText}>
                      Time from the moment you open the test kit, until the
                      moment the cap is sealed on.
                    </div>
                  </td>
                </tr>
              </table>
            </button>
            <button
              className={
                endButtonActive ? styles.endButtonActive : styles.endButton
              }
              onClick={() => handleEndClick()}
            >
              <table>
                <tr>
                  <td>
                    <div className={styles.ternaryTitle}>End-To-End</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.smallText}>
                      Time from the moment you enter the rec center, to the
                      moment you exit the back door.
                    </div>
                  </td>
                </tr>
              </table>
            </button>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <button
              className={styles.nextButton}
              onClick={() => {
                setShowInput(true)
                setShowInfo(false)
              }}
            >
              Next
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Info
