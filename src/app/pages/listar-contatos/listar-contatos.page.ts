import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonSearchbar,
  IonAvatar,
  IonSkeletonText,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
} from '@ionic/angular/standalone';
import { ApiService } from '../../services/api/api.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { RouterLink } from '@angular/router';
import { UserFilterPipe } from 'src/app/pipes/user-filter.pipe-pipe';

type Contact = {
  id?: string;
  name: string;
  email: string;
  source: 'api' | 'firebase';
};

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonSearchbar,
    IonAvatar,
    IonSkeletonText,
    IonIcon,
    IonFab,
    IonFabButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonBadge,
    CommonModule,
    FormsModule,
    RouterLink,
    UserFilterPipe,
  ],
})
export class ListarContatosPage implements OnInit {
  private apiUsers: any[] = [];
  private fbContatos: any[] = [];

  contatos: Contact[] = [];

  loading = true;
  query = '';

  constructor(
    private apiService: ApiService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.apiUsers = data;
        this.rebuildList();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });

    this.firebaseService.getContatos().subscribe({
      next: (data) => {
        this.fbContatos = data;
        this.rebuildList();
      },
      error: () => {},
    });
  }

  private rebuildList() {
    const fromApi: Contact[] = (this.apiUsers ?? []).map((u) => ({
      name: u.name,
      email: u.email,
      source: 'api' as const,
    }));

    const fromFb: Contact[] = (this.fbContatos ?? []).map((c: any) => ({
      id: c.id,
      name: c.nome ?? c.name ?? '',
      email: c.email ?? '',
      source: 'firebase' as const,
    }));

    this.contatos = [...fromFb, ...fromApi];
  }

  excluir(c: Contact) {
    if (c.source === 'firebase' && c.id) {
      this.firebaseService.deleteContato(c.id).catch(() => {});
    } else {
      this.apiUsers = this.apiUsers.filter((u) => !(u.email === c.email));
      this.rebuildList();
    }
  }

  reload(e: any) {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.apiUsers = data;
        this.rebuildList();
        this.loading = false;
        e.target.complete();
      },
      error: () => {
        this.loading = false;
        e.target.complete();
      },
    });
  }

  trackById = (_: number, c: Contact) => c.id ?? c.email ?? _;

  toggleDark() {
    document.body.classList.toggle(
      'dark',
      !document.body.classList.contains('dark')
    );
  }
}
