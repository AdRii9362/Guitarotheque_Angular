import { Component } from '@angular/core';
import { Guitares } from '../../models/guitares.model';
import { GuitaresService } from '../../services/guitares.service';
import { FormBuilder, FormGroup } from '@angular/forms';


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

selectedGuitareId: number | undefined;

formPutGuitare! : FormGroup
formPutImgGuitare! : FormGroup
isFormPutValid: boolean = false  
isFormPutImgValid: boolean = false


fileToUpload: File | null = null;

  currentPage: number = 1;
  pageSize: number = 9;
  guitarelistpag: Guitares[]=[]
  totalPages: number = 0;
  totalItems:number =0;


 constructor(private _service : GuitaresService, private formbuilder: FormBuilder) {
   
   _service.getAllGuitare().subscribe({
     next : (data: Guitares[])=> {
       console.log(data);
       this.guitarelist = data
       
     }
   })
  // #region TEST
 
  _service.getAllGuitarePag(this.currentPage).subscribe({
    next : (data2: Guitares[])=> {
          console.log(data2);

          this.guitarelistpag = data2
          this.totalItems = this.guitarelist.length; // Utilisation de la longueur du tableau de guitares

         this.calculateTotalPages();
        
  }
})

  // #endregion


  

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
   this.formPutGuitare = this.formbuilder.group({ 
    libelle: [""],
    prix: [""],
    nbrCordes : [""],
    anneeDeSortie: [""],
    description: [""]
  })

  this.formPutGuitare.valueChanges.subscribe(() => {
    this.isFormPutValid = this.formPutGuitare.valid;
  })
  // #endregion

   // #region "Initialisation formulaire Post Guitariste au lancement de la page"
   this.formPutImgGuitare = this.formbuilder.group({ 
    ImgGuitare: [""]
  })

  this.formPutImgGuitare.valueChanges.subscribe(() => {
    this.isFormPutImgValid = this.formPutImgGuitare.valid;
  })
  // #endregion

 }//end constructor

 // #region "TEST"

 calculateTotalPages(): void {
  this.totalPages = Math.ceil(this.totalItems / this.pageSize);
}

// // Méthode pour charger les guitares de la page spécifiée
loadPaginatedGuitares(): void {
  this._service.getAllGuitarePag(this.currentPage).subscribe({
    next : (data2: Guitares[])=> {
          console.log(data2);
          this.guitarelistpag = data2
          this.totalItems = this.guitarelist.length; // Utilisation de la longueur du tableau de guitares
          this.calculateTotalPages();
  }
})
}

// // Méthode pour passer à la page suivante
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    console.log("next");
    
    this.loadPaginatedGuitares();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadPaginatedGuitares();
  }
}

// #endregion
// #region "code OK"



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
          this.refreshGuitaresList();
        });
      }
        // #endregion


// #region "Delete Guitariste"
onDeleteSelectedGuitare() {
  if (this.selectDeleteGuitare != 0) {

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

        this.selectDeleteGuitare = 0
        // Rafraîchir la liste des guitaristes après la suppression
        this.refreshGuitaresList();
        
      });
    }
  } else {
    console.error("Aucune guitare sélectionnée.");
  }
  }

// #endregion

// #region "refreshlist"
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

    this._service.getAllGuitarePag(this.currentPage).subscribe({
      next : (data2: Guitares[])=> {
            console.log(data2);
            this.guitarelistpag = data2
            this.totalItems = this.guitarelist.length; // Utilisation de la longueur du tableau de guitares
            this.calculateTotalPages();
      },
      error: (error: any) => {
        console.error("Erreur lors du rafraîchissement de la liste des guitares :", error);
      }
    });

  }

// #endregion

// #region "Update Guitare"

// Mettre à jour le guitariste sélectionné avec les données du formulaire
onUpdateSelectedGuitare() {

  // Récupérer l'ID de la guitare sélectionné
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
    const libelle = this.formPutGuitare.get('libelle')?.value;
    const prix = this.formPutGuitare.get('prix')?.value;
    const nbrCordes = this.formPutGuitare.get('nbrCordes')?.value;
    const anneeDeSortie = this.formPutGuitare.get('anneeDeSortie')?.value;
    const description = this.formPutGuitare.get('description')?.value;
   

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
        this.formPutGuitare.reset(); // Réinitialiser le formulaire après la mise à jour
        this.selectedGuitareId = undefined
        this.refreshGuitaresList();
      });
    }
  } else {
    console.error("Aucune guitare sélectionnée.");
  }

  // #endregion
}

handleFileInput(et : EventTarget | null) {
  if(et !== null){
    const target = et as HTMLInputElement; // Permet de caster et en HTMLInputElement
    const files = target.files;
    if(files != null) {
      this.fileToUpload = files.item(0);
    }
  }
}

uploadFileToGuitare() {

 // Récupérer l'ID de la guitare sélectionné
 const selectedId: number | undefined = this.selectedGuitareId;

 // Vérifier si l'ID est défini
 if (selectedId !== undefined && this.fileToUpload != null) {
   // Rechercher la guitare correspondant dans votre liste de guitares

  
   const formData: FormData = new FormData();
   formData.append('GuitareImage', this.fileToUpload);
  this._service.updateImgGuitares(selectedId, formData).subscribe({
    next : (data) => {
      this.selectedGuitareId=0
      this.formPutImgGuitare.reset();
      this.refreshGuitaresList();
    },
    error(err) {
      
    },
  })

  } else {
    console.error("Aucune guitare sélectionnée.");
  }
}

// #endregion


// #enregion
}//end class


