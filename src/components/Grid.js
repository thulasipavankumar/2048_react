import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Row from "./Row"


import React from "react";

const Grid = ({  }) => {
    const [gridData, setgridData] = useState([[2, 0, 0, 0], [0, 2, 0, 0], [0,0,0,0], [0, 0, 0, 0]])
    
    const isValidGrid = () => {
        return true;
    }
    const getRandomNumArr = (length) => {
        let foo=[]
        for (let i = 0; i < length; i++) {
            foo.push(i);
        }
        foo = foo.sort(() => Math.random() - 0.5);
        return foo;
    }
    const introduceNewElementToGrid = (matrix) => {
        let duplicate = matrix.map(x=>x.map(y=>y));
        let rows = getRandomNumArr(duplicate.length)
        for(let i=0;i<rows.length;i++){
            let randomRow = rows[i];
            let columns = getRandomNumArr(duplicate[randomRow].length)
            for(let j=0;j<columns.length;j++){
                let randomCol = columns[j]
                if(duplicate[randomRow][randomCol]==0){
                    duplicate[randomRow][randomCol]=2
                    return duplicate
                }
            } 
        }        
        return duplicate;
    }
    const isMatrixFull = (matrix) => {
       
         for(let i=0;i<matrix.length;i++){
             for(let j=0;j<matrix[i].length;j++){
                 if(matrix[i][j]===0){
                     return false;
                 }

             }
         }
        return true;
    }

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
        
        matrix=gridData
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
    const rotateMatrixToRight = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[index]).reverse()) : matrix
    }
    const rotateMatrixToLeft = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index])) : matrix
    }

   // /*
        // ArrowUp ArrowLeft ArrowRight ArrowDown
   const onKeyPressed = (event) => {
    let data 
            // console.log(`key pressed ${event.key} ${event.code}`)
            switch (event.key) {
                case 'ArrowUp':  data = (collapseToTop(gridData));
                setgridData(introduceNewElementToGrid(data))
                    break;
                case 'ArrowLeft': data =(collapseToLeft(gridData));
                setgridData(introduceNewElementToGrid(data))
                    break;
                case 'ArrowRight': data =(collapseToRight(gridData));
                setgridData(introduceNewElementToGrid(data))
                    break;
                case 'ArrowDown': data =(collapseToBottom(gridData));
                setgridData(introduceNewElementToGrid(data))
                    break;
                default:
                    break;
            }
       
    };
 //*/
    const loadGrid = (matrix) => {
        
        if(isMatrixFull(matrix)){
            return <div>
                <ErrorMessage message={"Grid is full"}></ErrorMessage>
                {matrix.map((row, index) => {
            return <><Row rowData={row} key={'row-'+index}></Row></>
        })}
                </div>
        }
       
        const toReturn = matrix.map((row, index) => {
            return <><Row rowData={row} key={'row-'+index}></Row></>
        })
        
        return toReturn
    }
    const returnInValidData = () => {
        
        return <ErrorMessage message={"Invalid data"}></ErrorMessage>

    }
    //isValidGrid()?loadGrid(gridData):<ErrorMessage message={"Invalid data"} />
    return <div tabIndex={-1} onKeyDown={onKeyPressed}>{ isValidGrid()?loadGrid(gridData):returnInValidData()}</div>
     
}

export default Grid