import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contato-item',
  templateUrl: './contato-item.component.html',
  styleUrls: ['./contato-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, IonButton],
})
export class ContatoItemComponent {
 @Input({ required: true }) contato!: { id?: string; name?: string; nome?: string; email: string };
  @Output() excluir = new EventEmitter<void>();
}
