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

formPostGuitare! : FormGroup 
isFormPostValid: boolean = false 
selectedGuitareId: number | undefined;

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

   // #region "Initialisation formulaire Post Guitariste au lancement de la page"
   this.formPostGuitare = this.formbuilder.group({ 
    libelle: [""],
    prix: [""],
    nbrCordes : [""],
    anneeDeSortie: [""],
    description: [""]
  })

  this.formPostGuitare.valueChanges.subscribe(() => {
    this.isFormPostValid = this.formPostGuitare.valid;
  })
  // #endregion

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
        //  const datas = new FormData();
        //  datas.append()
  
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

// #region "Update Guitare"

// Mettre à jour le guitariste sélectionné avec les données du formulaire
onUpdateSelectedGuitare() {

  // Récupérer l'ID du guitariste sélectionné
  const selectedId: number | undefined = this.selectedGuitareId;

  // Vérifier si l'ID est défini
  if (selectedId !== undefined) {
    // Rechercher la guitare correspondant dans votre liste de guitares
    const selectedGuitare = this.guitarelist.find(g => g.id_Guitare === +selectedId);

    // Vérifier si un guitariste a été trouvé
    if (!selectedGuitare) {
      console.error("Aucune guitare sélectionnée.");
      return;
    }

    // Extraire les valeurs du formulaire
    const libelle = this.formPostGuitare.get('libelle')?.value;
    const prix = this.formPostGuitare.get('prix')?.value;
    const nbrCordes = this.formPostGuitare.get('nbrCordes')?.value;
    const anneeDeSortie = this.formPostGuitare.get('anneeDeSortie')?.value;
    const description = this.formPostGuitare.get('description')?.value;
   

    // Préparer les nouvelles données
    const newData = {
      libelle,
      prix,
      nbrCordes,
      anneeDeSortie,
      description
    };
   

    // Afficher la confirmation avec les anciennes et les nouvelles données
    if (confirm(
      `Êtes-vous sûr de vouloir mettre à jour ce guitariste?
      
      Anciennes données:
      Libelle: ${selectedGuitare.libelle}
      Prix: ${selectedGuitare.prix}€
      Nombre de cordes: ${selectedGuitare.nbrCordes}
      Année de sortie: ${selectedGuitare.anneeDeSortie}
      Desciption: ${selectedGuitare.description}
      
      Nouvelles données:
      Libelle: ${newData.libelle}
      Prix: ${newData.prix}€
      Nombre de cordes: ${newData.nbrCordes}
      Année de sortie: ${newData.anneeDeSortie}
      Desciption: ${newData.description}`
    )) {
      // Si l'utilisateur confirme, appeler le service pour mettre à jour le guitariste
      this._service.updateGuitare(selectedId, newData).subscribe(() => {
        console.log('Guitare mis à jour avec succès');
        this.formPostGuitare.reset(); // Réinitialiser le formulaire après la mise à jour
        window.location.reload();
      });
    }
  } else {
    console.error("Aucune guitare sélectionnée.");
  }

  // #endregion

}

// #endregion

}//end class


