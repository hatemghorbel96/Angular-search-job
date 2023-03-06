import { Favorit } from "./favorit";
import { Postuler } from "./postuler";
import { User } from "./user";

export class Job {
    jobid!: number;
    jobtype!: String
    title!: String
    minsalary!: number
    maxsalary!: number
    dateCreated!: Date
    experience!: String
    langue!: String
    description!: String
    requirements!: String
    localisation!: String
    website!: String
    expire!: Date
    user!: User;
    postules!: Postuler[];
    favorits!:Favorit[];
}
