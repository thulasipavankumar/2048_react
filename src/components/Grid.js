import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Row from "./Row"


import React from "react";

const Grid = ({ gridMatrix }) => {
    const [gridData, setgridData] = useState([[0, 2, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]])
    const loadGrid = () => {
        const toReturn = gridData.map((row, index) => {
            return <Row rowData={row} key={index}></Row>
        })
        console.log(toReturn)
        return toReturn
    }
    const validateGrid = () => {
        return true;
    }
    // ArrowUp ArrowLeft ArrowRight ArrowDown
    React.useEffect(() => {
        window.addEventListener('keydown', (event) => {
            console.log(`key pressed ${event.key} ${event.code}`)
            switch(event.key){
                case 'ArrowUp': collapseTop()
                break;
                case 'ArrowLeft': collapseLeft();
                break;
                case 'ArrowRight': collapseRight();
                break;
                case 'ArrowDown': collapseBottom();
                break;
            }
        });
    });
    const collapseLeft = () => {
        setgridData(gridData.map((row)=>
             row.map((val,index)=>{
                return index!==row.length-1?val+row[index+1]:0
            })
        ));
        gridData.forEach(printRow)
    }
    const collapseRight = () => {
        setgridData(gridData.map((row)=>
             row.map((val,index)=>{
                return index!==0?val+row[index-1]:0
            })
        ));
        gridData.forEach(printRow)
    }
    const collapseTop = () => {
        
    }
    const collapseBottom = () => {
        
    }
    const printRow = (rowData) => {
        console.log(rowData)
    }
    if (!validateGrid()) {
        return <ErrorMessage message="Invalid data" />
    }
    return <div>{loadGrid(gridData)}</div>
}

export default Grid