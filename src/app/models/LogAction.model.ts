import { Utilisateur } from "./Utilisateur.model"

export class LogAction {
    
    idLog?:number
    titre!:string
    contenu!:string
    typeEntite!:string
    idEntite!:number
    dateAction!:Date
    admin!:Utilisateur

}