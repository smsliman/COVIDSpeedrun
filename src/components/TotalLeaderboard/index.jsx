import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'

import firebase from '../../firebase.js'

import styles from './leaderboard.module.scss'

const TotalLeaderboard = params => {
  var database = firebase.database()
  const [times, setTimes] = useState([])
  const [showTable, setShowTable] = useState(false)

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

  useEffect(() => {
    ;(async () => {
      setShowTable(false)
      var count = 0
      var tempTimes = []
      database
        .ref('times')
        .orderByChild('Time')
        .on('value', function (snapshot) {
          snapshot.forEach(function (data) {
            if (data.val()['AnyPerSpit'] == anyButtonActive && count < 26) {
              count = count + 1
              var tempMinutes = Math.floor(data.val()['Time'] / 60000)
              var tempSeconds = Math.floor(
                (data.val()['Time'] - 60000 * tempMinutes) / 1000
              )
              var tempMillis =
                data.val()['Time'] - 60000 * tempMinutes - 1000 * tempSeconds
              tempTimes.push([
                count,
                data.val()['Name'],
                tempMinutes,
                tempSeconds,
                tempMillis,
                data.val()['Date']
              ])
            }
          })
          setTimes(tempTimes)
        })
      setShowTable(true)
    })()
  }, [database, params, anyButtonActive])

  return (
    <div className={styles.globalFont}>
      <Container id='mainContainer'>
        <Row>
          <Col className={styles.colCenter}>
            <div className={styles.titleText}>
              Here are the times at the very top of the rankings!
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
              <div>Any-Per-Spit</div>
            </button>
          </Col>
          <Col className={styles.colCenter}>
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
            {showTable && (
              <div className={styles.opaque}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <td>Rank</td>
                      <td>Name</td>
                      <td>Minutes</td>
                      <td>Seconds</td>
                      <td>Milliseconds</td>
                      <td>Date</td>
                    </tr>
                  </thead>
                  <tbody>
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
                            <td>
                              <div>{value[4]}</div>
                            </td>
                            <td>
                              <div>{value[5]}</div>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TotalLeaderboard
