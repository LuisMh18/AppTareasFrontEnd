export class User{
    constructor(
        public id: number,
        public role: number,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public password_confirmation: string
    ){}
}