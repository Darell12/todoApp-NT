import { AiFillQqCircle } from "react-icons/ai";
import { ITask } from "./types/task";

const baseURL = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseURL}/tasks`, { cache: 'no-store' });
    const todos = await res.json();
    return todos;
}

export const setNewTask = async (todo: ITask): Promise<ITask>  => {
    const res = await fetch(`${baseURL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;

}
export const editTask = async (todo: ITask): Promise<ITask>  => {
    const res = await fetch(`${baseURL}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
    const updateTodo = await res.json();
    return updateTodo;

}
export const deleteTasks = async (id: string): Promise<void>  => {
    await fetch(`${baseURL}/tasks/${id}`, {
        method: 'DELETE',
    })
}