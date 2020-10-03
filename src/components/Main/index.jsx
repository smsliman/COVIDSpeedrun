import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import firebase from '../../firebase.js'

import Info from '../../components/Info'
import Leaderboard from '../../components/Leaderboard'

import styles from './main.module.scss'

const Main = () => {
  var database = firebase.database()
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [name, setName] = useState('')

  const [showInfo, setShowInfo] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const handleSubmit = () => {
    var totalSeconds = Number(minutes) * 6 + Number(seconds)
    var finalMillis = Number(totalSeconds) * 1000 + Number(milliseconds)
    var timeKey = firebase
      .database()
      .ref('/times')
      .push().key
    var update = {}
    update['/times/' + timeKey] = finalMillis
    firebase
      .database()
      .ref()
      .update(update)
    setShowInput(false)
    setShowLeaderboard(true)
  }

  return (
    <div>
      {showInfo && (
        <>
          <Info
            setShowInput={() => setShowInput(true)}
            setShowInfo={() => setShowInfo(false)}
          ></Info>
        </>
      )}
      {showInput && (
        <Container id='mainContainer'>
          <Row>
            <Col className={styles.colCenter}></Col>
          </Row>
          <Row>
            <Col className={styles.colCenter}>
              <InputGroup className={styles.inputField}>
                <FormControl
                  onChange={e => setMinutes(e.target.value)}
                  placeholder='Minutes'
                  aria-label='Minutes'
                  aria-describedby='basic-addon1'
                />
                :
                <FormControl
                  onChange={e => setSeconds(e.target.value)}
                  placeholder='Seconds'
                  aria-label='Seconds'
                  aria-describedby='basic-addon1'
                />
                .
                <FormControl
                  onChange={e => setMilliseconds(e.target.value)}
                  placeholder='MilliSeconds'
                  aria-label='Milliseconds'
                  aria-describedby='basic-addon1'
                />
                <br />
                <FormControl
                  onChange={e => setName(e.target.value)}
                  placeholder='Name'
                  aria-label='Name'
                  aria-describedby='basic-addon1'
                />
              </InputGroup>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </Col>
          </Row>
        </Container>
      )}
      {showLeaderboard && <Leaderboard></Leaderboard>}
    </div>
  )
}

export default Main
