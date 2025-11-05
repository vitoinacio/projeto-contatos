import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonList } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonInput, IonButton, IonList,
    CommonModule, FormsModule, RouterLink
  ]
})
export class AdicionarContatoPage implements OnInit {

  nome: string = '';
  email: string = '';
  contatos: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getContatos().subscribe((data) => {
      this.contatos = data;
    });
  }

  adicionarContato() {
    if (!this.nome || !this.email) {
      alert('Preencha todos os campos!');
      return;
    }

    this.firebaseService.addContato({ nome: this.nome, email: this.email })
      .then(() => {
        this.nome = '';
        this.email = '';
      })
      .catch((err) => console.error('Erro ao adicionar:', err));
  }

  deletarContato(id: string) {
    this.firebaseService.deleteContato(id)
      .then(() => console.log('Contato removido!'))
      .catch((err) => console.error('Erro ao deletar:', err));
  }
}
