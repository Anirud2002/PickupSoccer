export interface Register {
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    contactNumber?: string,
}

export interface Login {
    userName: string,
    password: string,
}

export interface User {
    userName: string,
    firstName: string,
    lastName: string,
    token: string
}

