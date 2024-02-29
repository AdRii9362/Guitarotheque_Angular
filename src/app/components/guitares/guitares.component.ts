import { Component } from '@angular/core';
import { Guitares } from '../../models/guitares.model';
import { GuitaresService } from '../../services/guitares.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-guitares',
  templateUrl: './guitares.component.html',
  styleUrl: './guitares.component.scss'
})
export class GuitaresComponent {

guitarelist: Guitares[] = []

formInsertGuitare! : FormGroup //Insert
isFormInsertValid: boolean = false //Insert

selectDeleteGuitare: number = 0 //Delete

 constructor(private _service : GuitaresService, private formbuilder: FormBuilder) {

  _service.getAllGuitare().subscribe({
    next : (data: Guitares[])=> {
      console.log(data);
      this.guitarelist = data
      
    }
  })

  this.formInsertGuitare = this.formbuilder.group({ 
    libelle: [""],
    prix: [""],
    nbrCordes : [""],
    anneeDeSortie: [""],
    description: [""]

  })

  this.formInsertGuitare.valueChanges.subscribe(() => {
    this.isFormInsertValid = this.formInsertGuitare.valid;
  })

 }//end constructor


// #region "Insertion guitare"

InsertGuitare() {
  
        const data = {
         
          libelle: this.formInsertGuitare.get('libelle')?.value,
          prix: this.formInsertGuitare.get('prix')?.value,
          anneeDeSortie: this.formInsertGuitare.get('anneeDeSortie')?.value,
          nbrCordes: this.formInsertGuitare.get('nbrCordes')?.value,
          description: this.formInsertGuitare.get('description')?.value
        };
  
        this._service.insertGuitare(data).subscribe(() => {
          console.log('Nouvelle guitare ajoutée avec succès');
          this.formInsertGuitare.reset(); // Réinitialiser le formulaire après l'ajout
          window.location.reload();
        });
      }
        // #endregion


// #region "Delete Guitariste"
onDeleteSelectedGuitare() {
  if (this.selectDeleteGuitare) {

    const deletedGuitare = this.guitarelist.find(g => g.id_Guitare === Number(this.selectDeleteGuitare));

    if (confirm(
      `Êtes-vous sûr de vouloir supprimer cette guitare?
    
    Guitares:
    ID: ${deletedGuitare?.id_Guitare}
    Libellé: ${deletedGuitare?.libelle}
    Prix: ${deletedGuitare?.prix}€
    Nombre de cordes: ${deletedGuitare?.nbrCordes}
    Description: ${deletedGuitare?.description}

    `
    )) {
      // Appeler votre service de suppression avec l'identifiant du guitariste sélectionné
      this._service.deleteGuitare(this.selectDeleteGuitare).subscribe(() => {
        console.log("Guitare supprimée avec succès.");
        // Rafraîchir la liste des guitaristes après la suppression
        this.refreshGuitaresList();
        window.location.reload();
      });
    }
  } else {
    console.error("Aucune guitare sélectionnée.");
  }
  }



refreshGuitaresList() {
  // Réinitialiser la liste des guitares ou recharger les données depuis le service

    //  Recharger les données des guitaristes depuis le service
    this._service.getAllGuitare().subscribe({
      next: (data: Guitares[]) => {
        console.log(data);
        this.guitarelist = data;
      },
      error: (error: any) => {
        console.error("Erreur lors du rafraîchissement de la liste des guitares :", error);
      }
    });

}

// #endregion

}//end class


