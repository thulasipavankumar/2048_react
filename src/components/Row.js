import Block from "./Block"
const Row = ({rowData}) => {
return <div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd"> {
    rowData.map((value,index) =>{
        return  <Block element={value} key={index}></Block>
    })
 }</div>
}
export default Row