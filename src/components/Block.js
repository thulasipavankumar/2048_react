const Block = ({element}) => {
return (<div className={`cell tile_${element}`} >{element===0?"":element}</div>)
}
export default Block