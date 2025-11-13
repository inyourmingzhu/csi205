import React from 'react'
import { Link, Links } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'


function AppNavbar({ products, carts, setToken }) {
    return (
        <div>
            {/* <h2>APP NAVBAR</h2> */}

            <div
                className='d-flex justify-content-center gap-2'
                style={{ backgroundColor: '#FFCCCC' }}>

                <Link to={'home'}>

                    <Button variant='dark'> HOME </Button>

                </Link>


                <Link to={'calculator'}>

                    <Button variant='dark'> Calculatorn </Button>

                </Link>


                <Link to={'animation'}>

                    <Button variant='dark'> Animation </Button>

                </Link>

                <Link to={'components'}>

                    <Button variant='dark'> Components </Button>

                </Link>

                <Link to={'todos'}>

                    <Button variant='dark'> Todos </Button>

                </Link>

                <Link to={'products'}>

                    <Button variant='dark'> Products ({products.length}) </Button>

                </Link>

                <Link to={'carts'}>

                    <Button variant="dark" className="position-relative" >
                        Carts

                        {carts.length > 0 && (
                            //ถ้าใน cart มีของอยู่ (เมื่อเพิ่มสินค้า) ให้แสดง badge ด้านล่างนี้
                            <Badge className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {carts.length < 10 ? carts.length : '9+'}
                                {/* เป็นเงื่อนไขตรวจสอบว่า carts.length < 10 ? จริงไหม ถ้ามากกว่า 10 ให้แสดงเป็น 9+ */}
                            </Badge>

                        )}



                    </Button>


                </Link>

                <Link to={'logout'}>

                    <Button variant="outline-danger" onClick={() => { setToken('') }}> Logout </Button>

                </Link>


            </div>




        </div>
    )
}

export default AppNavbar