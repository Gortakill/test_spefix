/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { users } from './users'

export async function GET(_req: Request) {
    return NextResponse.json(users)
}

export async function POST(_req: Request) {
    const body = await _req.json()

    if (users.some((user) => user.email === body.email)) {
        return NextResponse.json({
            message: 'User with this email is alredy exist',
            status: 400,
        })
    }
    const user = { email: body.email, name: body.name }
    users.push(user)

    return NextResponse.json(user)
}
