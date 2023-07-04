import Block from "./Block"
const Row = ({rowData}) => {
return <div className="columns"> {
    rowData.map((value,index) =>{
        return  <Block element={value} key={'col-'+index}></Block>
    })
 }</div>
}
export default Row