import { Education } from './education';
import { Experience } from './experience';
import { User } from "./user";

export class Cv {
    cvid!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    phone!: string;
    address!: string;
    linkedin!: string;
    github!: string;
    birthday!: Date;
    salairemin!:number;
    poste!:string;
    publiccv!:number;
    educations!:Education[]
    user!:User;
    skills!: string;
    description!:string;

    langues!: string;
    interest!: string;
    ville!: string;
    website!: string;
    experiences: Experience[] = [{
        postTitle: '',
        enterpriseTitle: '',
        datedebutExp: new Date('dateString'),
        datefinExp: new Date('dateString'),
        description: '',
    }]
}
