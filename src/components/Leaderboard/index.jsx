import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

import firebase from '../../firebase.js'

import styles from './leaderboard.module.scss'

const Leaderboard = () => {
  var database = firebase.database()
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
  }, [database])

  return (
    <div>
      <Container id='mainContainer'>
        <Row>
          <Col className={styles.colCenter}>
            <Col className={styles.colCenter}>
              {times[1] && (
                <table>
                  {times.map((value, index) => {
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
          </Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}></Col>
        </Row>
        <Row>
          <Col className={styles.colCenter}></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Leaderboard
