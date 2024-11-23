import { UserList } from './UserList.component'

const getData = async () => {
    const res = await fetch('http://localhost:3000/api', { cache: 'no-store' })
    return res.json()
}

export const List = async () => {
    const users = await getData()

    return (
        <>
            <UserList initialUsers={users} />
        </>
    )
}
