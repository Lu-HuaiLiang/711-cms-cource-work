import Mock from "mockjs";
import { getTableData} from './response/data'
Mock.mock(/\/getTableData/, 'get', getTableData)
export default Mock