import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Row from "./Row"


import React from "react";

const Grid = ({ gridMatrix }) => {
    const [gridData, setgridData] = useState([[0, 2, 2, 2], [2, 2, 0, 0], [2, 0, 2, 2], [0, 0, 0, 2]])
    const loadGrid = () => {
        if(isMatrixFull(gridData)){
            return <ErrorMessage message={"Grid is full"}></ErrorMessage>
        }
        const toReturn = gridData.map((row, index) => {
            return <Row rowData={row} key={'row-'+index}></Row>
        })
        return toReturn
    }
    const isValidateGrid = () => {
        return true;
    }
    const introduceNewElementToGrid = (matrix) => {
        let foo=[]
        for (let i = 0; i < matrix.length; i++) {
            foo.push(i);
        }
        
    let elementInserted = false;

        return matrix;
    }
    const isMatrixFull = (matrix) => {
        for(let i=0;i<matrix.length;i++){
            for(let j=0;i<matrix.length;j++){
                if(matrix[i][j]===0){
                    return false;
                }
            }
        }
        return true;
    }
    // ArrowUp ArrowLeft ArrowRight ArrowDown
    React.useEffect(() => {
        window.addEventListener('keydown', (event) => {
            // console.log(`key pressed ${event.key} ${event.code}`)
            switch (event.key) {
                case 'ArrowUp': setgridData(collapseToTop(gridData))
                let withNewelement=introduceNewElementToGrid(gridData)
                console.log(withNewelement)
                    break;
                case 'ArrowLeft': setgridData(collapseToLeft(gridData));
                    break;
                case 'ArrowRight': setgridData(collapseToRight(gridData));
                    break;
                case 'ArrowDown': setgridData(collapseToBottom(gridData));
                    break;
            }
        });
    });
    const reduceTheArrayToLeft = (arr) => {
        let filteredArr = arr.filter(ele => ele !== 0)
        let temparr = [];
        for (let i = 0; i < filteredArr.length; i++) {
            let tempVal = filteredArr[i]
            let alreadyPushed = false
            if (i !== filteredArr.length - 1 && (filteredArr[i] == filteredArr[i + 1])) {
                temparr.push(tempVal * 2)
                alreadyPushed = true
                i++
            }
            if (!alreadyPushed)
                temparr.push(tempVal)
        }
        return temparr
    }
    const collapseToLeft = (matrix) => {
        return (matrix.map((eachRow) => {
            let resultArr = reduceTheArrayToLeft(eachRow)   
            return resultArr.concat(Array(eachRow.length - resultArr.length).fill(0))
        }));
    }
    const collapseToRight = (matrix) => {
        return (matrix.map((eachRow) => {
            let resultArr = reduceTheArrayToLeft(eachRow.reverse())
            return Array(eachRow.length - resultArr.length).fill(0).concat(resultArr.reverse())
        }));
    }
    const rotateMatrixToRight = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[index]).reverse()) : matrix
    }
    const rotateMatrixToLeft = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index])) : matrix
    }
    const collapseToTop = (matrix) => {
        let newArray = rotateMatrixToRight(matrix)
        let resultArr = newArray.map((eachRow) => {
            let resultArr = reduceTheArrayToLeft(eachRow.reverse())
            return Array(eachRow.length - resultArr.length).fill(0).concat(resultArr.reverse())
        })
        return (rotateMatrixToLeft(resultArr))
    }
    const collapseToBottom = (matrix) => {
        let rightRotatedArr = rotateMatrixToRight(matrix)
        let resultArr = rightRotatedArr.map((eachRow) => {
            let resultArr = reduceTheArrayToLeft(eachRow)
            return resultArr.concat(Array(eachRow.length - resultArr.length).fill(0))
        })
        return (rotateMatrixToLeft(resultArr))

    }
    const printRow = (rowData) => {
        console.log(rowData)
    }
    if (!isValidateGrid()) {
        return <ErrorMessage message={"Invalid data"} />
    }
    return <div>{loadGrid(gridData)}</div>
}

export default Grid