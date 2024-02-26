import { Component } from '@angular/core';
import { GuitaristesService } from '../../services/guitaristes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guitaristes } from '../../models/guitaristes.model';



@Component({
  selector: 'app-guitaristes',
  templateUrl: './guitaristes.component.html',
  styleUrl: './guitaristes.component.scss'
})

export class GuitaristesComponent {
  
  guitaristeslist! : Guitaristes[] //GetAll
  formgroup! : FormGroup //Insert
  isFormValid: boolean = false //Insert
  selectedGuitaristeId: number = 0
  ancienDataList: { [key: number]: { nom: string, prenom: string, dateNaiss: Date | null, guitare: string } } = {};

  ancienDataNom: string = '';
  ancienDataPrenom: string = '';
  ancienDataDateNaiss: Date | null = null;
  ancienDataGuitare: number[] = [];

  constructor( private _service : GuitaristesService,private formbuilder : FormBuilder){

    // #region "GetAll Guitaristes"
    _service.getAllGuitariste().subscribe({
      next : (data : Guitaristes[])=> {
        console.log(data)
        this.guitaristeslist = data
      }
    })  
    // #endregion

    // #region "Initialisation formulaire au lancement de la page"
    this.formgroup = this.formbuilder.group({ 
      nom : [""],
      prenom : [""],
      dateNaiss : [""],
      guitare : [""]
    })

    this.formgroup.valueChanges.subscribe(() => {
      this.isFormValid = this.formgroup.valid;
    })

    // #endregion
  }
  
  // #region "Selection d'un guitariste"
  onSelectGuitariste(guitaristeId: number) {
    // Mettre à jour l'identifiant du guitariste sélectionné
    this.selectedGuitaristeId = guitaristeId;
  }
  // #endregion


  
  // Mettre à jour le guitariste sélectionné avec les données du formulaire
  onUpdateSelectedGuitariste(guitaristeId: number) {

      // Extraire les valeurs du champ "guitare" après le pré-remplissage du formulaire
      let guitareValue: string = this.formgroup.get('guitare')?.value;
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
      console.log(guitareNumbers);
  
      // Préparer les nouvelles données
      const data = {
        nom: this.formgroup.get('nom')?.value,
        prenom: this.formgroup.get('prenom')?.value,
        dateNaiss: this.formgroup.get('dateNaiss')?.value,
        guitare: guitareNumbers
      };
  
      // Afficher la confirmation avec les anciennes et les nouvelles données
      if (confirm(
        `Êtes-vous sûr de vouloir mettre à jour ce guitariste?
        
        Nouvelles données:
        Nom: ${data.nom}
        Prénom: ${data.prenom}
        Date de naissance: ${data.dateNaiss}
        Guitare: ${data.guitare}`
      )) {
        // Si l'utilisateur confirme, appeler le service pour mettre à jour le guitariste
        this._service.updateGuitariste(guitaristeId, data).subscribe(() => {
          console.log('Guitariste mis à jour avec succès');
          this.formgroup.reset(); // Réinitialiser le formulaire après la mise à jour
          window.location.reload();
        });
      }
    }
  
  
  
  // #region "Delete Guitariste"
onDeleteSelectedGuitariste() {
  if (this.selectedGuitaristeId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce guitariste?")) {
      // Appeler votre service de suppression avec l'identifiant du guitariste sélectionné
      this._service.deleteGuitariste(this.selectedGuitaristeId).subscribe(() => {
        console.log("Guitariste supprimé avec succès.");
        // Rafraîchir la liste des guitaristes après la suppression
        this.refreshGuitaristesList();
        window.location.reload();
      });
    }
  } else {
    console.error("Aucun guitariste sélectionné.");
  }
}

refreshGuitaristesList() {
  // Réinitialiser la liste des guitaristes ou recharger les données depuis le service

 // Recharger les données des guitaristes depuis le service
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

// #region "Insertion guitariste"

  //Methode insertion 
InsertGuitariste() {
let guitareValue: string = this.formgroup.get('guitare')?.value;
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
       
        nom: this.formgroup.get('nom')?.value,
        prenom: this.formgroup.get('prenom')?.value,
        dateNaiss: this.formgroup.get('dateNaiss')?.value,
        guitare: guitareNumbers
      };

      this._service.insertGuitariste(data).subscribe(() => {
        console.log('Nouveau guitariste ajouté avec succès');
        this.formgroup.reset(); // Réinitialiser le formulaire après l'ajout
        window.location.reload();
      });
    }

 // #endregion
}
