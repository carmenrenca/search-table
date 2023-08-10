import { Component, OnInit } from '@angular/core';
import { fromEvent, of, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  delayWhen,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Result } from 'src/models/users';
import { UsersService } from 'src/services/pokemons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'filters-server-table';
  listUser: Result[] = [];
  name = '';
  constructor(private usersServ: UsersService) {}

  ngOnInit(): void {
    this.usersServ.getAll().subscribe((res) => (this.listUser = [...res]));
    this.onSearch();
  }

  onSearch() {
    const search = document.getElementById('name-filter');
    const keyUp$ = fromEvent(search as HTMLElement, 'keyup');

    keyUp$
      .pipe(
        debounceTime(3000),
        switchMap(() => this.usersServ.getByName(this.name))
      )
      .subscribe((res) => (this.listUser = [...res]));
  }
}
