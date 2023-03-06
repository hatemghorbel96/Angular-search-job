import { Cv } from "./cv";
import { Job } from "./job";
import { Postuler } from "./postuler";

export class User {
    userid!: number;
    username!: string;
    email!: string;
    password!: string;
    type!:number;
    photo!:string;
    cv!: string;
    description!: string;
    jobs!:Job[];
    cvs!:Cv[];
    postules!:Postuler[];
    thesize!: string;
    category!: string;

    firstname!: string;
    lastname!: string;
    facebooklink!: string;
    linkedinlink!: string;
}
