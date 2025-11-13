import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Products({ products, carts, setCarts }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    overflowY: 'auto',
                    height: '560px'
                }}
            >
                {products.map((product) => (
                    <Card key={product.id}>
                        <Card.Img variant="top" src={product.thumbnailUrl} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                <b>
                                    ${product.price.toFixed(2)}
                                </b>
                            </Card.Text>

                            {carts.find((cart) => cart.id === product.id) ? (
                                <span className='badge bg-danger'>Added</span>
                            ) : (
                                <Button variant="outline-primary" onClick={() => {
                                    setCarts([...carts, product])
                                }}>
                                    Add to Carts
                                </Button>
                            )}



                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Products




