import { filter } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { persona } from 'src/app/model/persona.model';

@Pipe({
  name: 'pipeSearch',
})
export class PipeSearchPipe implements PipeTransform {
  transform(lista: persona[], texto: string): any {
    if (!texto) return lista;

    return lista.filter(
      (user) =>
        user.apellido.toUpperCase().includes(texto.toUpperCase()) ||
        user.nombre.toUpperCase().includes(texto.toUpperCase()) ||
        user.provincia.toUpperCase().includes(texto.toUpperCase())
    );
  }
}
