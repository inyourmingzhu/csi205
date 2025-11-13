import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Carts({ carts, setCarts }) {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          overflowY: 'auto',
          height: '560px'
        }}
      >
        {carts.map((cart) => (
          <Card key={cart.id}>
            <Card.Img variant="top" src={cart.thumbnailUrl} />
            <Card.Body>
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>
                <b>
                  ${cart.price.toFixed(2)}
                </b>
              </Card.Text>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setCarts(carts.filter((c) => c.id !== cart.id))
                }}>
                Remove from Carts
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h4 style={{ textAlign: 'center' }} className='p-3 fs-5 fw-bold'>
        Item : {carts.length} items - Total Price : ${carts.reduce((prev, cart) => { return prev + cart.price }, 0).toFixed(2)}
      </h4>

      <div className="d-flex justify-content-center">
        <Button variant="warning" className="fw-bold">
          Checkout
        </Button>
      </div>


    </div>
  )
}

export default Carts                  