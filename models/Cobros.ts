import {ObjectId} from "mongodb";



export default class Cobros {
    constructor(
        public nombre: string,
        public valor: number[],
        public codigo: string,
        public id?: ObjectId
    ) {
    }
}