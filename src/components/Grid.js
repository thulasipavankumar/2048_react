import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Row from "./Row"
import Score from "./Score";


import React from "react";

const Grid = ({  }) => {
    const [gridData, setgridData] = useState([[2, 0, 0, 0], [0, 2, 0, 0], [0,0,0,0], [0, 0, 0, 0]])
    const [currentScore,setScore] = useState(0);
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    
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
        let score=0
        let filteredArr = arr.filter(ele => ele !== 0)
        let resultArr = [];
        for (let i = 0; i < filteredArr.length; i++) {
            let tempVal = filteredArr[i]
            let alreadyPushed = false
            if (i !== filteredArr.length - 1 && (filteredArr[i] == filteredArr[i + 1])) {
                resultArr.push(tempVal * 2)
                score+=(tempVal * 2)
                alreadyPushed = true
                i++
            }
            if (!alreadyPushed){
                resultArr.push(tempVal)
            }
                
        }
        return {resultArr,score}
    }
    const collapseToLeft = (matrix) => {
        return (matrix.map((eachRow) => {
            let {resultArr,score} = reduceTheArrayToLeft(eachRow)
            setScore(currentScore+score)   
            return resultArr.concat(Array(eachRow.length - resultArr.length).fill(0))
        }));
    }
    const collapseToRight = (matrix) => {
        return (matrix.map((eachRow) => {
            let {resultArr,score} = reduceTheArrayToLeft(eachRow.reverse())
            setScore(currentScore+score)
            return Array(eachRow.length - resultArr.length).fill(0).concat(resultArr.reverse())
        }));
    }
    const collapseToTop = (matrix) => {
        let newArray = rotateMatrixToRight(matrix)
        let newSubScore = 0
        let resultArr = newArray.map((eachRow) => {
            let {resultArr,score} = reduceTheArrayToLeft(eachRow.reverse())
            newSubScore+=score
            return Array(eachRow.length - resultArr.length).fill(0).concat(resultArr.reverse())
        })
        setScore(currentScore+newSubScore) 
        return (rotateMatrixToLeft(resultArr))
    }
    const collapseToBottom = (matrix) => {
        let rightRotatedArr = rotateMatrixToRight(matrix)
        let newSubScore = 0
        let resultArr = rightRotatedArr.map((eachRow) => {
            let {resultArr,score} = reduceTheArrayToLeft(eachRow)
            newSubScore+=score
            return resultArr.concat(Array(eachRow.length - resultArr.length).fill(0))
        })
        setScore(newSubScore+currentScore)
        return (rotateMatrixToLeft(resultArr))

    }
    const rotateMatrixToRight = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[index]).reverse()) : matrix
    }
    const rotateMatrixToLeft = (matrix) => {
        return matrix.length > 1 ? matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index])) : matrix
    }
    const areArraysEqual=(src,des)=>{
        if(src.length!==des.length){
            return false;
        }
        for(let i=0;i<src.length;i++){
            for(let j=0;j<src[i].length;j++){
                if(src[i][j].length!==des[i][j].length || src[i][j]!==des[i][j])
                    return false;   
            }
        }
        return true;
    }
   // /*
        // ArrowUp | ArrowLeft | ArrowRight | ArrowDown
   const handleKeyPress = (event) => {
    doActions(event.key)
  
    };
    // SwipeUp | SwipeLeft | SwipeRight | SwipeDown
    const handleSwipe = (event) => {

    }

    const resetSwipeCoordinates = () => {
        setTouchEnd(null)
        setTouchStart(null)
    }
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart({x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY})
    }

    const onTouchMove = (e) => setTouchEnd({x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY})

    const onTouchEnd = () => {

        if (!touchStart || !touchEnd) return
        const distanceX = touchStart.x - touchEnd.x
        const distanceY = touchStart.y - touchEnd.y
        const isLeftSwipeX = distanceX > minSwipeDistance
        const isRightSwipeY = distanceY < - minSwipeDistance
        if (isLeftSwipeX ){
            if(Math.abs(distanceY)>minSwipeDistance && distanceY>0)
                return doActions('SwipeUp')
            else 
                return doActions('SwipeLeft')
        }
        if (isRightSwipeY ){
            if(Math.abs(distanceY)>minSwipeDistance && distanceY>0)
                return doActions('SwipeDown')
            else 
                return doActions('SwipeRight')
            
        }
        // add your conditional logic here
    }
    const doActions = (action) => {
        let data
        switch (action) {
            case 'ArrowUp':  
            case 'SwipeUp': data = (collapseToTop(gridData));
            if(!areArraysEqual(data,gridData))
            setgridData(introduceNewElementToGrid(data))
            resetSwipeCoordinates();
                break;
            case 'ArrowLeft': 
            case 'SwipeLeft': data =(collapseToLeft(gridData));
            if(!areArraysEqual(data,gridData))
            setgridData(introduceNewElementToGrid(data))
            resetSwipeCoordinates();
                break;
            case 'ArrowRight': 
            case 'SwipeRight': data =(collapseToRight(gridData));
            if(!areArraysEqual(data,gridData))
            setgridData(introduceNewElementToGrid(data))
            resetSwipeCoordinates();
                break;
            case 'ArrowDown': 
            case 'SwipeDown':data =(collapseToBottom(gridData));
            if(!areArraysEqual(data,gridData))
            setgridData(introduceNewElementToGrid(data))
            resetSwipeCoordinates();
                break;
            default:
                break;
        }
    }
 //*/
    const loadGrid = (matrix) => {
        
        if(isMatrixFull(matrix)){
            return <div>
                <ErrorMessage message={"Grid is full"}></ErrorMessage>
                {matrix.map((row, index) =>  <Row rowData={row} key={'row-'+index}></Row>)}
                <Score currentScore={currentScore}></Score>
                </div>
        }
       
        const toReturn = matrix.map((row, index) => {
            return <div tabIndex={-1} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onKeyDown={handleKeyPress}>
            <Row rowData={row} key={'row-'+index}></Row>
           
            </div>
        })
        
        return toReturn
    }
    const returnInValidData = () => {
        
        return <ErrorMessage message={"Invalid data"}></ErrorMessage>

    }
    //isValidGrid()?loadGrid(gridData):<ErrorMessage message={"Invalid data"} />
    return <><div >{ isValidGrid()?loadGrid(gridData):returnInValidData()}
     ${`touch: ${touchStart} ${touchEnd}`}</div>
    <Score currentScore={currentScore}></Score></>
     
}

export default Grid