import { Component } from '@angular/core';
import { GuitaristesService } from '../../services/guitaristes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guitaristes } from '../../models/guitaristes.model';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { GuitaresService } from '../../services/guitares.service';
import { Guitares } from '../../models/guitares.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-guitaristes',
  templateUrl: './guitaristes.component.html',
  styleUrl: './guitaristes.component.scss'
})

export class GuitaristesComponent {
  
  status!:boolean

  guitaristeslist: Guitaristes[] = [];
  guitareModal : Guitares | undefined;


  formInsertGuitariste! : FormGroup //Insert
  isFormInsertValid: boolean = false //Insert
  
  selectDeleteGuitariste: number = 0 //Delete

 
  formPostGuitariste! : FormGroup 
  isFormPostValid: boolean = false 
  selectedGuitaristeId: number | undefined;
  // guitaristeslistIntermediaire: [] = [];


  constructor( 
    private _service : GuitaristesService,
    private formbuilder : FormBuilder, 
    private _serviceGuitare: GuitaresService,
    private _authService: AuthService){
  // #region "GetAll variable intermediaire"

  //   this._service.getAllGuitariste().subscribe((data: Guitaristes[]) => {
  //     // Assigner les données à votre variable guitaristeslist
  //     this.guitaristeslist = data;
  
  //     // Initialiser le tableau des variables intermédiaires
  //     this.guitaristeslistIntermediaire = [];
  
  //     // Parcourir la liste des guitaristes pour stocker leurs données dans les variables intermédiaires
  //     this.guitaristeslist.forEach(guitariste => {
  //         const intermediaire = {

  //             guitaristeId: guitariste.id_Guitariste,
  //             guitaristeNom: guitariste.nom,
  //             guitaristePrenom: guitariste.prenom,
  //             guitaristeDateNaiss: guitariste.dateNaiss,
  //             // guitare: guitariste.guitare // Si vous avez besoin de cette propriété
  //         };
  //         this.guitaristeslistIntermediaire.push(intermediaire);
  //     });
  
  //     // Afficher dans la console les données pour vérification
  //     console.log('Liste des guitaristes :', this.guitaristeslist);
  //     console.log('Variables intermédiaires des guitaristes :', this.guitaristeslistIntermediaire);
  // });
  
    // #endregion
    _authService.isTokenExistSub.subscribe({
      next : (value : boolean) => this.status = value
    })
    _authService.emitTokenExist()

    // #region "GetAll Guitaristes"
    _service.getAllGuitariste().subscribe({
      next : (data : Guitaristes[])=> {
        console.log(data)
        this.guitaristeslist = data
      }
    })  
    // #endregion

    

// #region "Initialisation formulaire Insertion Guitariste au lancement de la page"
    this.formInsertGuitariste = this.formbuilder.group({ 
      nom : [""],
      prenom : [""],
      dateNaiss : [""],
      guitare : [""]
    })

    this.formInsertGuitariste.valueChanges.subscribe(() => {
      this.isFormInsertValid = this.formInsertGuitariste.valid;
    })
    
    
    // #endregion

    // #region "Initialisation formulaire Post Guitariste au lancement de la page"
    this.formPostGuitariste = this.formbuilder.group({ 
      nom : [""],
      prenom : [""],
      dateNaiss : [""],
      guitare : [""]
    })

    this.formPostGuitariste.valueChanges.subscribe(() => {
      this.isFormPostValid = this.formPostGuitariste.valid;
    })
    // #endregion
  } //fin construtor
    
  

 // #region "Insertion guitariste"

InsertGuitariste() {
let guitareValue: string = this.formInsertGuitariste.get('guitare')?.value;
console.log(guitareValue);

let guitareTab: string[] = guitareValue.split(',');
console.log(guitareTab);

// Convertir les valeurs en nombre et les insérer dans un tableau de nombres
let guitareNumbers: number[] = [];

for (let guitare of guitareTab) {
  // Convertir la chaîne de caractères en nombre et l'ajouter au tableau
  let num: number = Number(guitare.trim()); // Utilisez trim() pour supprimer les espaces autour de la chaîne
  if (!isNaN(num)) { // Vérifiez si la conversion est réussie et que le résultat n'est pas NaN
    guitareNumbers.push(num);
  }
}
console.log(guitareNumbers)

      const data = {
       
        nom: this.formInsertGuitariste.get('nom')?.value,
        prenom: this.formInsertGuitariste.get('prenom')?.value,
        dateNaiss: this.formInsertGuitariste.get('dateNaiss')?.value,
        guitare: guitareNumbers
      };

      this._service.insertGuitariste(data).subscribe(() => {
        console.log('Nouveau guitariste ajouté avec succès');
        this.formInsertGuitariste.reset(); // Réinitialiser le formulaire après l'ajout
        this.refreshGuitaristesList();
      });
    }
      // #endregion

// #region "Delete Guitariste"
  onDeleteSelectedGuitariste() {
    if (this.selectDeleteGuitariste) {

      const deletedGuitariste = this.guitaristeslist.find(g => g.id_Guitariste === Number(this.selectDeleteGuitariste));

      let deletedGuitaristeDate: Date | undefined;

    if (deletedGuitariste) {
      deletedGuitaristeDate = new Date(deletedGuitariste.dateNaiss);
      const formatDeletedDateGuitariste = format(deletedGuitaristeDate, 'dd MMMM yyyy', {locale: fr});

      
      if (confirm(
        `Êtes-vous sûr de vouloir supprimer ce guitariste?
      
      Guitaristes:
      ID: ${deletedGuitariste?.id_Guitariste}
      Nom: ${deletedGuitariste?.nom}
      Prénom: ${deletedGuitariste?.prenom}
      Date de naissance: ${formatDeletedDateGuitariste}
      Guitare(s): ${deletedGuitariste?.id_Guitare}

      `
      )) {
        // Appeler votre service de suppression avec l'identifiant du guitariste sélectionné
        this._service.deleteGuitariste(this.selectDeleteGuitariste).subscribe(() => {
          console.log("Guitariste supprimé avec succès.");
          // Rafraîchir la liste des guitaristes après la suppression
          this.refreshGuitaristesList();
          
        });
      }
    } else {
      console.error("La date de naissance du guitariste supprimé n'est pas définie.");
    }
    } 
    else {
      console.error("Aucun guitariste sélectionné.");
    }
  }

  refreshGuitaristesList() {
    // Réinitialiser la liste des guitaristes ou recharger les données depuis le service

      //  Recharger les données des guitaristes depuis le service
      this._service.getAllGuitariste().subscribe({
        next: (data: Guitaristes[]) => {
          console.log(data);
          this.guitaristeslist = data;
        },
        error: (error: any) => {
          console.error("Erreur lors du rafraîchissement de la liste des guitaristes :", error);
        }
      });

  }

// #endregion


// #region "Update Guitariste"

// Mettre à jour le guitariste sélectionné avec les données du formulaire
onUpdateSelectedGuitariste() {

  // #region "test"
  // if (this.selectedGuitaristeId !== undefined) {
  //   console.log("ID du guitariste sélectionné :", this.selectedGuitaristeId);
  // } else {
  //   console.error("Aucun guitariste sélectionné.");
  // }

  // // Récupérer l'ID du guitariste sélectionné
  // const selectedId = this.selectedGuitaristeId;

  // // Rechercher le guitariste correspondant dans votre liste de guitaristes
  // const selectedGuitariste = this.guitaristeslist.find(g => g.id_Guitariste == selectedId);

  // // Vérifier si un guitariste a été trouvé
  // if (selectedGuitariste) {
  //   console.log("Guitariste sélectionné :", selectedGuitariste);
  //   console.log("ID:", selectedGuitariste.id_Guitariste);
  //   console.log("Nom du guitariste sélectionné :", selectedGuitariste.nom);
  //   console.log("Prénom du guitariste sélectionné :", selectedGuitariste.prenom);
  //   console.log("Date de naissance du guitariste sélectionné :", selectedGuitariste.dateNaiss);
  //   console.log("Guitares du guitariste sélectionné :", selectedGuitariste.guitare);

  //   // Assigner les valeurs à des variables intermédiaires
  //   const guitaristeId = selectedGuitariste.id_Guitariste;
  //   const guitaristeNom = selectedGuitariste.nom;
  //   const guitaristePrenom = selectedGuitariste.prenom;
  //   const guitaristeDateNaiss = selectedGuitariste.dateNaiss;
  //   const guitaristeGuitare = selectedGuitariste.guitare;

  //   // Utiliser ces variables intermédiaires comme vous le souhaitez
  // } else {
  //   console.error("Aucun guitariste sélectionné.");
  // }
// #endregion
 
  // Récupérer l'ID du guitariste sélectionné
  const selectedId: number | undefined = this.selectedGuitaristeId;

  // Vérifier si l'ID est défini
  if (selectedId !== undefined) {
    // Rechercher le guitariste correspondant dans votre liste de guitaristes
    const selectedGuitariste = this.guitaristeslist.find(g => g.id_Guitariste === +selectedId);

    // Vérifier si un guitariste a été trouvé
    if (!selectedGuitariste) {
      console.error("Aucun guitariste sélectionné.");
      return;
    }

    // Extraire les valeurs du formulaire
    const nom = this.formPostGuitariste.get('nom')?.value;
    const prenom = this.formPostGuitariste.get('prenom')?.value;
    const dateNaiss = this.formPostGuitariste.get('dateNaiss')?.value;
    const guitareValue: string = this.formPostGuitariste.get('guitare')?.value;
    const guitareTab: string[] = guitareValue.split(',');
    const guitareNumbers: number[] = guitareTab.map(guitare => Number(guitare.trim()));

    // Préparer les nouvelles données
    const newData = {
      nom,
      prenom,
      dateNaiss,
      guitare: guitareNumbers
    };
   

    //conversion format date TS => npm install date fns
    const oldDateNaiss = new Date(selectedGuitariste.dateNaiss);
    const newDateNaiss = new Date(newData.dateNaiss);
    
    // Formater les dates en utilisant le format 'dd-MMM-yyyy' en français
    const formattedOldDate = format(oldDateNaiss, 'dd MMMM yyyy', {locale: fr});
    const formattedNewDate = format(newDateNaiss, 'dd MMMM yyyy',{locale: fr});

    // Afficher la confirmation avec les anciennes et les nouvelles données
    if (confirm(
      `Êtes-vous sûr de vouloir mettre à jour ce guitariste?
      
      Anciennes données:
      Nom: ${selectedGuitariste.nom}
      Prénom: ${selectedGuitariste.prenom}
      Date de naissance: ${formattedOldDate}
      Guitare: ${selectedGuitariste.id_Guitare}
      
      Nouvelles données:
      Nom: ${newData.nom}
      Prénom: ${newData.prenom}
      Date de naissance: ${formattedNewDate}
      Guitare: ${newData.guitare}`
    )) {
      // Si l'utilisateur confirme, appeler le service pour mettre à jour le guitariste
      this._service.updateGuitariste(selectedId, newData).subscribe(() => {
        console.log('Guitariste mis à jour avec succès');
        this.formPostGuitariste.reset(); // Réinitialiser le formulaire après la mise à jour
        this.refreshGuitaristesList();
      });
    }
  } else {
    console.error("Aucun guitariste sélectionné.");
  }


  // #endregion
}
// #region popupImageGuitare (peut etre optimisé)
public popup(id_guitare : number) : void{
  this._serviceGuitare.getGuitare(id_guitare).subscribe(
    {
      next : (data : Guitares) => this._showModal(data),
      error : (err) => console.error(err)      
    }
  )
}

private _showModal(guitare : Guitares) : void{
  this.guitareModal = guitare;
  if (this.guitareModal != undefined) {    
    let modal = document.querySelector('#modalGuitare') as HTMLDialogElement;
    modal.showModal();
  }
}
// #endregion

}//fin class
  
  
  





