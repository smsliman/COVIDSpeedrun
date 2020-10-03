import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import firebase from '../../firebase.js'

import styles from './main.module.scss'

const Main = () => {
  var database = firebase.database()
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [name, setName] = useState('')
  const [times, setTimes] = useState([])

  useEffect(() => {
    ;(async () => {
      var tempTimes = []
      database
        .ref('times')
        .orderByValue()
        .on('value', function (snapshot) {
          snapshot.forEach(function (data) {
            var tempMinutes = Math.floor(data.val() / 60000)
            var tempSeconds = Math.floor(
              (data.val() - 60000 * tempMinutes) / 1000
            )
            var tempMillis =
              data.val() - 60000 * tempMinutes - 1000 * tempSeconds
            tempTimes.push([data.key, tempMinutes, tempSeconds, tempMillis])
          })
          setTimes(tempTimes)
        })
    })()
  }, [database, minutes])

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
  }

  return (
    <div>
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
        <Row>
          <Col className={styles.colCenter}>
            {times[1] && (
              <table>
                {times.map((value, index) => {
                  console.log(times)
                  return (
                    <>
                      <tr>
                        <td>
                          <div>{value[0]}</div>
                        </td>
                        <td>
                          <div>{value[1]}</div>
                        </td>
                        <td>
                          <div>{value[2]}</div>
                        </td>
                        <td>
                          <div>{value[3]}</div>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Main
