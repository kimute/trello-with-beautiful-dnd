import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
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
    return (
        <Draggable  draggableId={toDoId+""} index={index}>
            {(magic, snapshot)=> (
            <Card
               isDragging={snapshot.isDragging} 
               ref={magic.innerRef}
               {...magic.draggableProps}
               {...magic.dragHandleProps}>
                   {toDoText}</Card>)}
        </Draggable>
    )
}
//for stop rerendering using memo
export default React.memo(DraggableCard)
