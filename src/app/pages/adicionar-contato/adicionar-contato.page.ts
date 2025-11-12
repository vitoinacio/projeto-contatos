import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonIcon,
    IonButtons,
  ],
})
export class AdicionarContatoPage implements OnInit {
  nome: string = '';
  email: string = '';
  telefone: string = ''; 
  contatos: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getContatos().subscribe((data) => {
      this.contatos = data;
    });
  }

  adicionarContato() {
    if (!this.nome || !this.email || !this.telefone) {
      alert('Preencha todos os campos!');
      return;
    }

    this.firebaseService
      .addContato({
        nome: this.nome,
        email: this.email,
        phone: this.telefone, 
      })
      .then(() => {
        this.nome = '';
        this.email = '';
        this.telefone = ''; 
      })
      .catch((err) => console.error('Erro ao adicionar:', err));
  }

  deletarContato(id: string) {
    this.firebaseService
      .deleteContato(id)
      .then(() => console.log('Contato removido!'))
      .catch((err) => console.error('Erro ao deletar:', err));
  }

  toggleDark() {
    document.body.classList.toggle(
      'dark',
      !document.body.classList.contains('dark')
    );
  }
}
