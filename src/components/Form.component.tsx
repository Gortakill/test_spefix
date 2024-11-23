'use client'
import { IUser } from '@/types/user'
import { useForm } from 'react-hook-form'

interface FormType {
    email: string
    name: string
}

interface Props {
    onUserAdded: (user: IUser) => void
}

export const Form = ({ onUserAdded }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormType>()

    const onSubmit = async (data: FormType) => {
        const res = await fetch('http://localhost:3000/api', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        const addedUser: IUser = await res.json()

        onUserAdded(addedUser)
        reset()
    }

    return (
        <form
            action=""
            className="bg-green-300 flex flex-col w-1/4 p-5 rounded-xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="mb-2 font-semibold ">Add new user</h1>
            <input
                type="text"
                className="p-2 border-solid border-gray-400 border-2 outline-none focus:border-blue-300"
                placeholder="Enter email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*/,
                        message: 'Wrong enter email',
                    },
                })}
            />
            {errors.email?.message && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            <input
                type="text"
                className="my-5 p-2 border-solid border-gray-400 border-2 outline-none focus:border-blue-300"
                placeholder="Enter name"
                {...register('name', { required: 'Name is required' })}
            />
            <button
                type="submit"
                className="bg-blue-400 w-1/2 mx-auto p-2 rounded-xl hover:bg-blue-300 transition-colors duration-150 ease-in-out"
            >
                Add user
            </button>
        </form>
    )
}
