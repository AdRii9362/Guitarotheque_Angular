import { Component } from '@angular/core';
import { Guitares } from '../../models/guitares.model';
import { GuitaresService } from '../../services/guitares.service';

@Component({
  selector: 'app-guitares',
  templateUrl: './guitares.component.html',
  styleUrl: './guitares.component.scss'
})
export class GuitaresComponent {

guitarelist: Guitares[] = []

 constructor(private _service : GuitaresService) {
  _service.getAllGuitare().subscribe({
    next : (data: Guitares[])=> {
      console.log(data);
      this.guitarelist = data
      
    }
  })
 }
}


