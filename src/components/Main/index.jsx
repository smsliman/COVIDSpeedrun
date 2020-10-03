import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import styles from './main.module.scss'

const Main = () => {
  return (
    <div>
      <Container id='mainContainer'>
        <Row>
          <Col className={styles.colCenter}></Col>
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

export default Main
