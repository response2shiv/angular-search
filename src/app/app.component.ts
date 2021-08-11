import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Employee {
  address: {};
  company: {};
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Search Employee List';
  url: string = 'https://jsonplaceholder.typicode.com/users';

  employeeCtrl = new FormControl();
  filteredEmployee: Observable<Employee[]>;

  employees: Employee[] = [];
  selectedEmployeeData: Employee[] = [];

  constructor(private http: HttpClient) {

    this.http.get(this.url).subscribe((data: any) => {
      console.log('employees = ', data);
      data.forEach((element: Employee) => {
        this.employees.push(element);
      });
    });


    this.filteredEmployee = this.employeeCtrl.valueChanges
      .pipe(
        startWith(''),
        map(employee => employee ? this._filterEmployees(employee) : this.employees.slice())
      );
  }

  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addSelectedEmpList(employee: Employee) {
    this.selectedEmployeeData.push(employee);
  }

}