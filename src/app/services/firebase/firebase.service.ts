import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}
  
  addContato(contato: { nome: string; email: string; }) {
    const contatosRef = collection(this.firestore, 'contatos');
    return addDoc(contatosRef, contato);
  }

  getContatos(): Observable<any[]> {
    const contatosRef = collection(this.firestore, 'contatos');
    return collectionData(contatosRef, { idField: 'id' });
  }

  deleteContato(id: string) {
    const contatoDoc = doc(this.firestore, `contatos/${id}`);
    return deleteDoc(contatoDoc);
  }
}
