import { Job } from "./job";
import { User } from "./user";

export class Postuler {
    postulerid!:number;
    job!:Job;
    user!:User;
    description!:string;
    etat!:number;
    dateCreated!:Date;
    selected!: boolean;
}
