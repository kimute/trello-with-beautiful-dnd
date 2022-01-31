
import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo } from "./atoms";
import { useSetRecoilState } from "recoil";
import { toDostate } from "./atoms";

const Wrapper = styled.div`
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  margin-bottom: 20px;
  min-width: 300px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;`;

const Title = styled.h2`
    text-align:center;
    margin-bottom: 20px;
    color: #F8EFBA;
    font-weight:600;
`;


interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
   background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
   flex-grow: 1;
   transition: background-color 0.3s ease-ion-out;
   padding: 10px;
    
`;

const Form = styled.form `
   width: 100%;
   input{
       width: 100%;
       outline: none;
       background-color:transparent;
       text-color:white;
       border: 0px solid;
       color: white;
       border-bottom: 1px solid black;
   }
   input::placeholder {
    color: white;
  }
`;

interface IBoardPorps {
    toDos: ITodo[];
    boardId: string;
}
interface IForm {
    toDo: string;
}

function Board({toDos, boardId}: IBoardPorps){
    const setToDos = useSetRecoilState(toDostate)
    const { register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({toDo}: IForm) =>{
        const newToDo ={
            id: Date.now(),
            text: toDo
        };
        setToDos((allBoards) => {
            const returnArray ={
                ...allBoards,
                [boardId]:[newToDo, ...allBoards[boardId]]
            }
            return returnArray;
        });
        setValue("toDo", "")
    };
    return (
        <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: true})} type="text" placeholder={`Add task here on ${boardId}...`}></input>
        </Form>
        <Droppable droppableId={boardId}>
            {(magic, snapshot)=>(
               <Area 
                   isDraggingOver={snapshot.isDraggingOver}
                   isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} 
                   ref={magic.innerRef} {...magic.droppableProps}>
                 {toDos.map((toDo, index) =>(
                   <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                 ))}
                 {magic.placeholder}
                </Area>)}
        </Droppable>
        </Wrapper>
    );
}

export default Board