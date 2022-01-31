import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { toDostate} from './atoms';
import Board from './Board';

const Wrapper = styled.div`
  display: flex;
  min-width:580px;
  margin: 0 50px;
  margin-right: 50px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap:10px;
  grid-template-columns: repeat(4, 1fr);
`;



function App() {
  const [toDos, setToDos] =useRecoilState(toDostate);
  // when the drag finished
  const onDragEnd =(info: DropResult) =>{
   console.log(info);
   const {destination, draggableId, source} = info;
   //kill the process if not destination
   if(!destination) return;
   if(destination?.droppableId === source.droppableId){
     setToDos((allBoards) => {
       const boardCopy = [...allBoards[source.droppableId]];
       // copy object
       const taskObj = boardCopy[source.index]
       // delete index just one ex) [c,d e] e:2 ->　[c, d]
       boardCopy.splice(source.index, 1);
       //  inert index Nr.0  e [e, c, d]
       boardCopy.splice(destination.index,0, taskObj)
       return {
         ...allBoards,
         //"Doing": boardCopy
         [source.droppableId]:boardCopy
       };
     });
   }
   // cross move check
   if(destination?.droppableId !== source.droppableId){
     setToDos((allBoards) => {
       const sourceBoard = [...allBoards[source.droppableId]];
       // grep object
       const taskObj = sourceBoard[source.index]
       const destinationBoard =[...allBoards[destination?.droppableId]];
       sourceBoard.splice(source.index, 1);
       destinationBoard.splice(destination?.index, 0, taskObj);
       return {
         ...allBoards,
         [source.droppableId]: sourceBoard,
         [destination.droppableId]: destinationBoard
       };
     });
   };
  }
  useEffect(() => {
    const getItems = localStorage.getItem("lists");
    if (getItems === "{}" || getItems === null)
      return;
    setToDos(JSON.parse(getItems));
  }, []);
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper >
        <Boards>
           {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos
          [boardId]}/>)}
         </Boards>
       </Wrapper>
    </DragDropContext>
  );
}

export default App;

