import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface numResult { /* Lo usaremos para almacenar los resultados y mostrarlos en el template */
    number : number;
    color: String;
    multiples: number[];
}

export interface document { /* Lo usaremos para guardar la entrada del usuario y el resultado en firestore */
    input: number;
    result: numResult[];
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    myForm;
    result: numResult[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private firestore: AngularFirestore
    ) { 
        this.myForm = this.formBuilder.group({ /* Sirve para capturar la entrada del usuario */
            number: 0
        });
    }

    onSubmit(form:any){  /* Funcion que procesa la entrada del usuario y resuelve */
        this.result = [];
        for(let i = 0; i <= form.number; i++){  /* Recorremos cada numero del 0 hasta el numero introducido por el usuario */
            const x: numResult = {number: i, color: '', multiples: []};
            if(i % 3 === 0){  /* Evalueamos si es multiplo de 3 */
                x.color = 'success';
                x.multiples.push(3);
            }
            if(i % 5 === 0){  /* Evaluamos si es multiplo de 5 */
                x.color = x.color || 'danger';
                x.multiples.push(5);
            }
            if(i % 7 === 0){  /* Evaluamos si es multiplo de 7 */
                x.color = x.color || 'primary';
                x.multiples.push(7);
            }
            if(x.color){  /* Si tuvo algun multiplo lo agregamos a la lista */
                this.result.push(x);
            }
        }
        /* Guardamos el resultado en Firestore */
        const usersInput = this.firestore.collection<document>('usersInput');
        usersInput.add({input: form.number, result: this.result});
    }

}