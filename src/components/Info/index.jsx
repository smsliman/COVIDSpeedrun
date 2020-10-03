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
            Welcome to the Covid Test Speedrunning Leaderboard!
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>The rules are simple:</Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <button
              className={
                anyButtonActive ? styles.anyButtonActive : styles.anyButton
              }
              onClick={() => handleAnyClick()}
            >
              <div>Any-Per-Spit</div>
              <div>
                Time from the moment you open the test kit, until the moment the
                cap is sealed on.
              </div>
            </button>
            <button
              className={
                endButtonActive ? styles.endButtonActive : styles.endButton
              }
              onClick={() => handleEndClick()}
            >
              <div>End-To-End</div>
              <div>
                Time from the moment you enter the rec center, to the moment you
                exit the back door.
              </div>
            </button>
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}>
            <Button
              onClick={() => {
                setShowInput(true)
                setShowInfo(false)
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Info
