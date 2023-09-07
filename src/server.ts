import { serverHttp } from "./https"
import "./websocket"

serverHttp.listen(3000, () => console.log('http://localhost:3000'))
