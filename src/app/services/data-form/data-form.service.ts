import { Injectable } from '@angular/core';

@Injectable()
export class DataFormService {

  private dataEntryForm = {
    Id: ['1'],
    Product_Info_1: ['1'],
    Product_Info_2: ['D3'],
  }

  constructor() { }

  getDataEntryForm() {
    return this.dataEntryForm;
  }

}
