'use client'

import { IUser } from '@/types/user'
import { useState } from 'react'
import { Form } from './Form.component'

export const UserList = ({ initialUsers }: { initialUsers: IUser[] }) => {
    const [users, setUsers] = useState<IUser[]>(initialUsers)
    return (
        <>
            <Form
                onUserAdded={(newUser) => {
                    return setUsers((prev) => [...prev, newUser])
                }}
            />
            <ul className="w-full flex flex-col items-center">
                {users.map((user: IUser) => (
                    <li
                        key={user.email}
                        className="bg-green-300 w-1/4 rounded-xl p-3 mt-2"
                    >
                        <span>
                            email: {user.email}
                            <br />
                        </span>
                        <span>name: {user.name}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}
