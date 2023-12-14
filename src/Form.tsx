import { FormEvent } from "react";

type FormProps = {
    handleSubmit: (e: FormEvent) => void
    message: string
    setMessage:  React.Dispatch<React.SetStateAction<string>>
}

const Form = ({handleSubmit, message, setMessage}: FormProps) => {
    return ( 
        <form onSubmit={handleSubmit}>
            <div className="absolute bottom-0 w-full">
                <div className='border-4 border-slate-500 flex justify-end rounded w-full text-dark font-semibold h-16 text-3xl '>
                <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} className='p-4 focus:outline-none w-full h-full' autoFocus />
                <button type="submit" className='py-1 px-6 bg-dark text-white'>Send</button>
                </div>
            </div>
        </form>
     );
}
 
export default Form;