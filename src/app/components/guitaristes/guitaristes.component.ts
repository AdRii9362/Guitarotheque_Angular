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
  
  guitaristeslist! : Guitaristes[]
  formgroup! : FormGroup
  isFormValid: boolean = false


  constructor( private _service : GuitaristesService,private formbuilder : FormBuilder){

    _service.getAll().subscribe({
      next : (data : Guitaristes[])=> {
        console.log(data)
        this.guitaristeslist = data
      }
    })
    
    this.formgroup = this.formbuilder.group({ 
      nom : [""],
      prenom : [""],
      dateNaiss : [""],
      guitare : [""]
    })

    this.formgroup.valueChanges.subscribe(() => {
      this.isFormValid = this.formgroup.valid;
    })
  }

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

      this._service.Insert(data).subscribe(() => {
        console.log('Nouveau guitariste ajouté avec succès');
        this.formgroup.reset(); // Réinitialiser le formulaire après l'ajout
        window.location.reload();
      });
    }
}
