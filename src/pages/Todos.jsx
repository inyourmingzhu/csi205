import { useEffect, useRef, useState } from "react"
import { fetchTodos } from "../data/todos"
import { Form, Table, Badge, Button, Modal} from 'react-bootstrap'


const Todos = () => {

    const newIdRef = useRef()
    const newTitleRef = useRef()
    

    //  fetchTodos -> todosRaw -> filter -> todos -> pagination -> view
    //             onlywaiting ->
    //       todos -> [] -> numpages  -> [] -> curpage
    //itemsperpage ->
    const [todosRaw, setTodosRaw] = useState ([])
    const [todos, setTodos] = useState ([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [numPages, setNumPages] = useState(3)
    const [curPage, setCurPage] = useState(1)



    //load
    useEffect( () => {
        setTodosRaw(fetchTodos())
    }, []) //fetch todos on loadeds

    useEffect ( () => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter( (todo) => {
                return todo.completed === false //ต้องโชว์ตัวที่ยังไม่เสร็จ completed เลยเป็น false
            } ))
        } 
        else {
            setTodos(todosRaw)
        }
    },[todosRaw,onlyWaiting])


    useEffect ( () => {
        setNumPages(Math.ceil(todos.length / itemsPerPage))
    }, [todos, itemsPerPage]) 

    useEffect ( () => {

        if (numPages <= 0) setCurPage(0)
        else { //has todos
            if(curPage > numPages) setCurPage(numPages)
                else if (curPage <= 0) setCurPage(1)
        }

    } , [numPages])

    const waitingClicked = (id) => {
        console.log(id)
        const foundTodos = todos.find( (todo) => {
            return todo.id === id
        })

        foundTodos.completed = true

        setTodosRaw([...todosRaw]) // force to be effect (refresh)
    }

    const deleteClicked = (id) => {
        setTodosRaw(todosRaw.filter( (todo) => todo.id !== id ))
    }


    //handle modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const saveClicked = (id, title) => {
        console.log(id, title)
        if (title.trim() !== "") {
            setTodosRaw([...todosRaw, {
                userId: 1,
                id ,
                title,
                completed: false,
            }])
        }
        
        newIdRef.current.value = ""
        newTitleRef.current.value = ""

        handleClose()
    }


  return (
    <>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
            <Button style={{ pointerEvents: 'none' }}>
                <i className='bi bi-plus'></i>
            </Button>&nbsp;&nbsp;
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value = {todosRaw.reduce( (prev , todo) => {
                    return todo.id > prev ? todo.id : prev
                } , -1) + 1}
                disabled = {true}
                ref={newIdRef}
              />

            <Form.Label>Title :</Form.Label>
              <Form.Control
                placeholder=" New todo, here !!! "
                autoFocus 
                ref={newTitleRef}
              />

            </Form.Group>
            
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => 
          saveClicked(
            Number(newIdRef.current.value) , 
            newTitleRef.current.value
                    )
            }
            >   
            Save
          </Button>
        </Modal.Footer>

      </Modal>
      {/* model end */}



        {/* filter */}
        
        <Form>
            <div className="d-flex justify-content-between align-items-center p-3">

                <div className="d-flex align-items-center">

                    <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    // label={'Show only'}
                    onChange={(e) => {setOnlyWaiting(e.target.checked) }}
                />

                Show only&nbsp;

                <Button variant="warning" style={{ pointerEvents: 'none' }}>
                    Waiting&nbsp; <i class="bi bi-clock"></i>
                </Button> 
                </div>
                

                <Form.Select 
                aria-label="Default select example " 
                className="w-25" 
                onChange={ (e) => {setItemsPerPage(e.target.value)} }>
                    <option value={5}>5 item per page</option>
                    <option value={10}>10 item per page</option>
                    <option value={50}>50 item per page</option>
                    <option value={100}>100 item per page</option>
                </Form.Select>
            </div>
        </Form>
        

        {/* table */}
        <div>
            <Table striped bordered hover>

                <thead className="table-dark">
                    <tr>
                        <th  className="text-center" style={{width: '3rem'}} >ID</th>
                        <th className="text-center">Title</th>
                        <th className="text-end" style={{width: '12rem'}}>
                            Completed&nbsp;
                            <Button onClick={() => {handleShow()}}>
                                <i className='bi bi-plus'></i>
                            </Button>
                            </th>
                    </tr>
                </thead>

                <tbody>

                    {/* <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr> */} 
                    {/* คอมเม้นไว้เป็นต้นแบบ */}
                    
                    
                    
                    { 
                    // start = (curPage - 1) x itemsPerPage + 1 สูตรเต็ม ๆ คือแบบนี้ แต่ต้องเอา +1 ออก เพราะ index เริ่มต้นที่ 0
                    //                   1               5
                    // ดังนั้น start = (curPage - 1) x itemsPerPage  =  0
                    // stop = curPage x itemsPerPage - 1          = 4 ต้อง -1 เพราะรายการมันมี 5 ถ้า index เริ่มที่ 0 ต้องจบที่ 4
                    todos
                        .filter( (todo,index) => {                 
                            return ( index >= (curPage - 1 ) * itemsPerPage 
                                    && // แต่
                                    index <= curPage * itemsPerPage - 1
                                )
                        }) 
                        
                        
                        
                        .map( (todo) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        <h5>
                                        <Badge bg="secondary">{todo.id}</Badge>
                                        </h5>
                                    </td>

                                    <td>{todo.title}</td>

                                    <td className="text-end">
                                
                                        {todo.completed ? (

                                        <Badge bg="success" className="fs-6">
                                            done&nbsp;
                                            <i class="bi bi-check-lg"></i>
                                        </Badge>
                                        
                                        ) : (
                                        
                                        <Button variant='warning' onClick={() => {waitingClicked(todo.id)}}>
                                            waiting&nbsp;
                                            <i class="bi bi-clock"></i>
                                        </Button>

                                        )}

                                        &nbsp;

                                        <Button variant='danger' onClick={ () => deleteClicked(todo.id) }>
                                            <i class="bi bi-trash"></i>
                                        </Button>

                                    </td>
                                </tr>
                            )
                        })}

                            
                        
                    </tbody>
                </Table>
            </div>

            {/* page control */}

            <div className="text-center">

                <Button variant="outline-primary"
                    onClick={() => setCurPage(1)} 
                    //ถ้า curPage เป็น true จะ return true ถ้าเป็น false ก็ return false disabled = {curPage === 1 ? true : false}
                    disabled = {curPage === 1}> 
                    First
                </Button>&nbsp;

                <Button variant="outline-primary"
                //set ไม้ให้สามารถกดหน้าน้อยกว่าหน้าที่มีอยู่ไปได้ เขียนย่อได้นะ เขียนเป็น curPage > 1  && setCurPage((p) => p-1)
                    onClick={() => {
                        if (curPage > 1) {
                        setCurPage( (p) => p - 1 )
                            }
                        }}
                    disabled = {curPage === 1}>
                    Previous
                </Button>&nbsp;

                <span>
                    {curPage}&nbsp;/&nbsp;{numPages}&nbsp;
                </span>

                <Button variant="outline-primary"
                    //set ไม้ให้สามารถกดหน้าเกินหน้าที่มีอยู่ไปได้ เขียนย่อได้นะ เขียนเป็น curPage < numPages && setCurPage((p) => p+1)
                    onClick={() => {
                        if (curPage < numPages) {
                        setCurPage( (p) => p + 1 )
                            }
                        }}
                    disabled = {curPage === numPages}>
                    Next
                </Button>&nbsp;

                <Button variant="outline-primary" 
                    onClick={() => {setCurPage(numPages)}}
                    disabled = {curPage === numPages}>
                    Last
                </Button>
    
            </div>

    </>
  )
}

export default Todos