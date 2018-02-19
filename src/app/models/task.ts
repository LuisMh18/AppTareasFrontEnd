export class Task{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: string,
        public created_at,
        public updated_at,
    ){}
}