import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Toast from 'react-bootstrap/Toast'

import firebase from '../../firebase.js'

import Info from '../../components/Info'
import Leaderboard from '../../components/Leaderboard'

import styles from './main.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'

const Main = () => {
  var database = firebase.database()
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [name, setName] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [totalMillis, setTotalMillis] = useState(0)

  const [showInfo, setShowInfo] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const [startDate, setStartDate] = useState(new Date())

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

  const handleSubmit = () => {
    if (
      isNaN(Number(minutes)) ||
      isNaN(Number(seconds)) ||
      isNaN(Number(milliseconds))
    ) {
      alert('Invalid Input: times must be number')
      return
    }
    if (Number(seconds) == 0 && Number(minutes) == 0) {
      alert('Please enter a non-zero amount of seconds')
      return
    }

    var totalSeconds = Number(minutes) * 6 + Number(seconds)
    var finalMillis = Number(totalSeconds) * 1000 + Number(milliseconds)
    setTotalMillis(finalMillis)
    var timeKey = firebase
      .database()
      .ref('/times')
      .push().key
    firebase
      .database()
      .ref('/times/' + timeKey)
      .update({
        Time: finalMillis,
        Name: name,
        Date: startDate,
        AnyPerSpit: anyButtonActive
      })
    setShowToast(true)
    setShowInput(false)
    setShowLeaderboard(true)
    // window.location.href =
    //   'mailto:user@example.com?subject=Subject&body=message%20goes%20here'
  }

  return (
    <div>
      {/* <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={5000}
        autohide
        className={styles.toast}
      >
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
          <strong className='mr-auto'>Success!</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>Your time has been successfully submitted!</Toast.Body>
      </Toast> */}
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
            <Col className={styles.colCenter}>
              <div className={styles.titleText}>Enter Your Time Below: </div>
            </Col>
          </Row>
          <Row>
            <Col className={styles.colCenter}>
              <InputGroup className={styles.inputField}>
                <Col>
                  <FormControl
                    className={styles.topLineInput1}
                    onChange={e => setMinutes(e.target.value)}
                    placeholder='Minutes'
                    aria-label='Minutes'
                    aria-describedby='basic-addon1'
                  />
                </Col>
                <Col className={styles.semicolon}>:</Col>
                <Col className={styles.colCenter}>
                  <FormControl
                    className={styles.topLineInput2}
                    onChange={e => setSeconds(e.target.value)}
                    placeholder='Seconds'
                    aria-label='Seconds'
                    aria-describedby='basic-addon1'
                  />
                  <div className={styles.dot}>.</div>
                </Col>
                <Col>
                  <FormControl
                    className={styles.topLineInput3}
                    onChange={e => setMilliseconds(e.target.value)}
                    placeholder='MilliSeconds'
                    aria-label='Milliseconds'
                    aria-describedby='basic-addon1'
                  />
                  <br />
                </Col>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col className={styles.colCenter}>
              <InputGroup>
                <Col className={styles.colCenter}>
                  <FormControl
                    className={styles.nameInput}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name'
                    aria-label='Name'
                    aria-describedby='basic-addon1'
                  />
                </Col>
              </InputGroup>
            </Col>
            <Col className={styles.colCenter}>
              <DatePicker
                className={styles.datePicker}
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Col>
            <Col>
              <div className={styles.bodyText}>Select your Category:</div>
            </Col>
            <Col>
              <button
                className={
                  anyButtonActive ? styles.anyButtonActive : styles.anyButton
                }
                onClick={() => handleAnyClick()}
              >
                <div>Any-Per-Spit</div>
              </button>
            </Col>
            <Col>
              <button
                className={
                  endButtonActive ? styles.endButtonActive : styles.endButton
                }
                onClick={() => handleEndClick()}
              >
                <div>End-To-End</div>
              </button>
            </Col>
          </Row>
          <Row>
            <Col className={styles.colCenter}>
              <button
                className={styles.submitButton}
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      )}
      {showLeaderboard && (
        <Leaderboard
          totalMillis={totalMillis}
          AnyPerSpit={anyButtonActive}
        ></Leaderboard>
      )}
    </div>
  )
}

export default Main
