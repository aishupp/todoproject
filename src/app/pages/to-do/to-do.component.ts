import { Component } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  todoItems: any[] = [];
  filteredItems: any[] = [];
  todoObj: any = {
    itemId: '',
    todoText: ''
  }


  ngOnInit(): void {
    const localData = localStorage.getItem("todoList");
    if (localData != null) {
      this.todoItems = JSON.parse(localData);
      this.filteredItems = this.todoItems;
    }
  }

  addToDoItem() {
    this.todoObj.itemId = this.todoItems.length + 1;
    this.todoItems.unshift(this.todoObj);
    localStorage.setItem('todoList', JSON.stringify(this.todoItems));
    this.todoObj = {
      itemId: '',
      todoText: ''
    }
  }

  isCheckedBoxChecked() {
    const checkedCount = this.todoItems.filter(m => m.isChecked == true).length;
    if (checkedCount !== 0) {
      return true;
    } else {
      return false;
    }
  }
  deleteCheckedItems() {
    const checkRecords = this.todoItems.filter(m => m.isChecked == true);
    for (let index = 0; index < checkRecords.length; index++) {
      const checkRecord = this.todoItems.findIndex(m => m.itemId == checkRecords[index].itemId);
      this.todoItems.splice(checkRecord, 1);
    }
    localStorage.setItem('todoList', JSON.stringify(this.todoItems));
  }
  onFilter(search: string) {
    const filterData = this.todoItems.filter(m => m.todoText.toLowerCase().startsWith(search.toLowerCase()));
    if (filterData.length !== 0) {
      this.filteredItems = filterData;
    } else {
      if (this.todoObj.todoText == '') {
        this.filteredItems = this.todoItems;
      }
    }
  }
}
