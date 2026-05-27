import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';

export default function Dashboard() {
  return (
    <Container className='mt-4'>
      <SBreadCrumb />

      <div className='mb-4'>
        <h3 className='fw-bold text-dark'>Welcome Back!</h3>
        <p className='text-muted'>Here&apos;s your event management overview</p>
      </div>

      <Row className='g-4'>
        <Col xs={12} sm={6} lg={3}>
          <Card className='border-0 shadow-sm h-100'>
            <Card.Body className='d-flex align-items-center'>
              <div className='rounded-circle bg-primary bg-opacity-10 p-3 me-3'>
                <i className='bi bi-calendar-event text-primary fs-4'></i>
              </div>
              <div>
                <h5 className='mb-0 fw-bold'>12</h5>
                <small className='text-muted'>Events</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className='border-0 shadow-sm h-100'>
            <Card.Body className='d-flex align-items-center'>
              <div className='rounded-circle bg-success bg-opacity-10 p-3 me-3'>
                <i className='bi bi-people text-success fs-4'></i>
              </div>
              <div>
                <h5 className='mb-0 fw-bold'>248</h5>
                <small className='text-muted'>Participants</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className='border-0 shadow-sm h-100'>
            <Card.Body className='d-flex align-items-center'>
              <div className='rounded-circle bg-warning bg-opacity-10 p-3 me-3'>
                <i className='bi bi-person-badge text-warning fs-4'></i>
              </div>
              <div>
                <h5 className='mb-0 fw-bold'>36</h5>
                <small className='text-muted'>Talents</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className='border-0 shadow-sm h-100'>
            <Card.Body className='d-flex align-items-center'>
              <div className='rounded-circle bg-info bg-opacity-10 p-3 me-3'>
                <i className='bi bi-credit-card text-info fs-4'></i>
              </div>
              <div>
                <h5 className='mb-0 fw-bold'>89</h5>
                <small className='text-muted'>Payments</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4 g-4'>
        <Col xs={12} lg={8}>
          <Card className='border-0 shadow-sm'>
            <Card.Header className='bg-white border-0 py-3'>
              <h5 className='mb-0 fw-bold'>Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <p className='text-muted mb-0'>No recent activity to display</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className='border-0 shadow-sm'>
            <Card.Header className='bg-white border-0 py-3'>
              <h5 className='mb-0 fw-bold'>Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className='d-flex justify-content-between mb-3'>
                <span className='text-muted'>Total Revenue</span>
                <span className='fw-bold'>Rp 45.000.000</span>
              </div>
              <div className='d-flex justify-content-between mb-3'>
                <span className='text-muted'>Pending Orders</span>
                <span className='fw-bold'>8</span>
              </div>
              <div className='d-flex justify-content-between'>
                <span className='text-muted'>Completed Events</span>
                <span className='fw-bold'>5</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}