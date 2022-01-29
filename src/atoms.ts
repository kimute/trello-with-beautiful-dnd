import { atom } from "recoil";


export interface ITodo{
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: ITodo[];
}

export const toDostate = atom<IToDoState>({
    key:"toDo",
    default:{
        "To Do": [],
        Doing: [],
        Done: []
    },
})