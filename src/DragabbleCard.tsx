import React from "react";
import { useSetRecoilState } from "recoil";
import { toDostate} from './atoms';
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FiX } from "react-icons/fi";


const Card = styled.div<{ isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => 
    props.isDragging ? "#2f3640" : props.theme.cardColor};
  color: ${ (props) => props.isDragging ? "white" :"black"}
  
`;

interface IDragabbleCardProps{
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({ toDoId, toDoText, index}:IDragabbleCardProps) {
    const setToDos = useSetRecoilState(toDostate);
    const removeCard = (id: string) => {
        setToDos((allBoards) => {
          const copyBoard = Object.assign({}, allBoards);
          const keys = Object.keys(allBoards);
          keys.forEach((key) => {
            copyBoard[key] = allBoards[key].filter((x) => x.id !== Number(id));
          });
          return copyBoard;
        });
    }
    return (
        <Draggable  draggableId={toDoId+""} index={index}>
            {(magic, snapshot)=> (
            <Card
               isDragging={snapshot.isDragging} 
               ref={magic.innerRef}
               {...magic.draggableProps}
               {...magic.dragHandleProps}>
                   {toDoText}
                <FiX onClick={() =>
              removeCard(magic.draggableProps["data-rbd-draggable-id"])}/>       
            </Card>)}
        </Draggable>
    )
}
//for stop rerendering (using memo)
export default React.memo(DraggableCard)
