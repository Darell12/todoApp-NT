'use client';

import { ITask } from "@/types/task"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation'
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';
import { deleteTasks, editTask } from "@/api";


interface TasktProps {
    task: ITask,
}
const Task: React.FC<TasktProps> = ({ task }) => {
    const router = useRouter();

    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDeleted] = useState<boolean>(false)
    const [CurrentTask, setCurrentTask] = useState<string>(task.text)

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        console.log(CurrentTask);

        await editTask({
            id: task.id,
            text: CurrentTask,
        })
        setOpenModalEdit(false);
        setCurrentTask('');
        router.refresh();

    }
    const handleDeleteTodo = async (id: string) => {

        console.log(CurrentTask);

        await deleteTasks(id)
        setOpenModalDeleted(false);
        router.refresh();

    }
    return (
        <tr key={task.id}>
            {/* <th>{contador}</th> */}
            <th className="w-full">{task.text}</th>
            <th className="flex gap-5">
                <button className="btn" onClick={() => setOpenModalEdit(true)}>
                    <FiEdit className="text-blue-500" size={25} />
                </button>
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} title={'Edit Task'}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <div className="form-control w-full">
                            <input
                                value={CurrentTask}
                                onChange={e => setCurrentTask(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full " />
                            <button type='submit' className='btn btn-primary mt-2'>Save</button>
                        </div>
                    </form>
                </Modal>
                <button className="btn" onClick={() => setOpenModalDeleted(true)}>
                    <FiTrash2 className="text-red-500" size={25} /></button>
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDeleted} title={'Delete Task'}>
                    <form>
                        <div className="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Warning: You want to delete this task?</span>
                            <button
                                onClick={() => handleDeleteTodo(task.id)}
                                type="button"
                                className="btn btn-error">Delete</button>
                        </div>
                    </form>
                </Modal>
            </th>
        </tr>

    )
}

export default Task