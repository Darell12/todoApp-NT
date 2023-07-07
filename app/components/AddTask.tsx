'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { setNewTask } from '@/api';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log(newTaskValue);
    
    await setNewTask({
      id: uuidv4(),
      text: newTaskValue,
    })
    setModalOpen(false);
    setNewTaskValue('');
    router.refresh();

  }

  return (
    <div><button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
      ADD NEW TASK
      <AiOutlinePlus size={18} className='ml-2' /></button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} title={'Add new Task'}>
        <form onSubmit={handleSubmitNewTodo}>
          <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What we need to do?</span>
          </label>
          <input 
          value = {newTaskValue}
          onChange={e => setNewTaskValue(e.target.value)}
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full " />
          <button type='submit' className='btn btn-primary mt-2'>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask