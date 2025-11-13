import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



function ForwardToHome() {

    const navigate = useNavigate() //ถีบไปหน้าอื่น ก็คือถ้ารันแล้วไม่เจอหน้าอะไรเลย ให้ถีบไปหน้าโฮม
    useEffect(() => navigate('../home'), []) //load


  return (
    <h2>Forward To Home</h2>
  )
}

export default ForwardToHome