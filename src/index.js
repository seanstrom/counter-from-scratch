import { main } from './main'
import './index.scss'


const mountNodeId = 'app'
const mountNode = document.getElementById(mountNodeId)


main({ window: window, node: mountNode })
