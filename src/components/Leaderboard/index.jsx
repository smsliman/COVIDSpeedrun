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
import TotalLeaderboard from '../TotalLeaderboard/index.jsx'

const Leaderboard = params => {
  var database = firebase.database()
  const [times, setTimes] = useState([])
  const [showTable, setShowTable] = useState(false)

  const [anyButtonActive, setAnyButtonActive] = useState(params['AnyPerSpit'])
  const [endButtonActive, setEndButtonActive] = useState(!params['AnyPerSpit'])

  const [showTopTimes, setShowTopTimes] = useState(false)

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
      var tempTimes = []
      // database
      //   .ref('times')
      //   .orderByChild('Time')
      //   .endAt(params['totalMillis'])
      //   .limitToFirst(5)
      //   .on('value', function (snapshot) {
      //     snapshot.forEach(function (data) {
      //       var tempMinutes = Math.floor(data.val()['Time'] / 60000)
      //       var tempSeconds = Math.floor(
      //         (data.val()['Time'] - 60000 * tempMinutes) / 1000
      //       )
      //       var tempMillis =
      //         data.val()['Time'] - 60000 * tempMinutes - 1000 * tempSeconds
      //       tempTimes.push([
      //         data.val()['Name'],
      //         tempMinutes,
      //         tempSeconds,
      //         tempMillis,
      //         data.val()['Date']
      //       ])
      //     })
      //     setTimes(tempTimes)
      //   })

      var count = 0
      database
        .ref('times')
        .orderByChild('Time')
        .endAt(params['totalMillis'])
        .on('value', function (snapshot) {
          snapshot.forEach(function (data) {
            if (data.val()['AnyPerSpit'] == anyButtonActive && count < 11) {
              count = count + 1
              var tempMinutes = Math.floor(data.val()['Time'] / 60000)
              var tempSeconds = Math.floor(
                (data.val()['Time'] - 60000 * tempMinutes) / 1000
              )
              var tempMillis =
                data.val()['Time'] - 60000 * tempMinutes - 1000 * tempSeconds
              tempTimes.push([
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
    <div>
      {!showTopTimes && (
        <Container id='mainContainer'>
          <Row>
            <Col className={styles.colCenter}>
              <div className={styles.titleText}>
                Here are some times that were close to yours!
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={styles.colCenter}>
              <button
                className={styles.topTimesButton}
                onClick={() => setShowTopTimes(true)}
              >
                Click here to see the "Top Times" Instead
              </button>
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
                <Table striped bordered hover>
                  <thead>
                    <tr>
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
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      )}
      {showTopTimes && <TotalLeaderboard></TotalLeaderboard>}
    </div>
  )
}

export default Leaderboard
