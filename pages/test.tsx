import axios from "axios"
axios.defaults.baseURL = 'http://localhost:8080';

export default function Test(props: any[]) {
  const sendReq = () => {
    axios.get('/').then(res => {
      console.log(res.status, res.data)}
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
      <button onClick={sendReq}>发请求</button>
    </div>
  )
}