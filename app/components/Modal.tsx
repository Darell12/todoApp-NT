interface ModalProps {
    modalOpen: boolean
    setModalOpen: Function,
    children: React.ReactNode,
    title: string

}

const Modal: React.FC<ModalProps> = ({ title,modalOpen, setModalOpen, children }) => {
    return (
        <dialog  className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <button 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                onClick={() => setModalOpen(false)}>✕</button>
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="py-4">{children}</div>
            </div>
        </dialog>)
}

export default Modal