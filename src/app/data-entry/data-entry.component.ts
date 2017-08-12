import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AwsService } from '../services/aws/aws.service';
import { DataFormService } from '../services/data-form/data-form.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
  providers: []
})
export class DataEntryComponent implements OnInit {
  dataForm: FormGroup;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor(
    private fb: FormBuilder,
    private AWS: AwsService,
    private ds: DataFormService
  ) { }

  ngOnInit() {
    this.dataForm = this.fb.group(this.ds.getDataEntryForm())
  }

  submit() {
    this.AWS.predict('hello')
  }

}
