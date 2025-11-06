import { Injectable } from '@angular/core';
import { Database, ref, push, remove, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private db: Database) {}

  addContato(contato: { nome: string; email: string }) {
    const contatosRef = ref(this.db, 'contatos');
    return push(contatosRef, contato);
  }

  getContatos(): Observable<any[]> {
    return new Observable((sub) => {
      const contatosRef = ref(this.db, 'contatos');
      const unsubscribe = onValue(
        contatosRef,
        (snapshot) => {
          const val = snapshot.val() || {};
          const lista = Object.entries(val).map(([id, data]: any) => ({
            id,
            ...data,
          }));
          sub.next(lista);
        },
        (err) => sub.error(err)
      );
      return () => unsubscribe();
    });
  }

  deleteContato(id: string) {
    const contatoRef = ref(this.db, `contatos/${id}`);
    return remove(contatoRef);
  }
}
