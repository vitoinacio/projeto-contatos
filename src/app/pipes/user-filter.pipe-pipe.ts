import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userFilter', standalone: true })
export class UserFilterPipe implements PipeTransform {
  transform(list: any[] = [], q: string = ''): any[] {
    const s = q.trim().toLowerCase();
    if (!s) return list;
    return list.filter((u) =>
      `${u.name ?? u.nome ?? ''} ${u.email ?? ''}`.toLowerCase().includes(s)
    );
  }
}
