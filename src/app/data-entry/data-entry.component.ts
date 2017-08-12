import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AwsService } from '../services/aws/aws.service';

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
    private AWS: AwsService
  ) { }

  ngOnInit() {
    this.dataForm = this.fb.group({
      f1: []
    })
  }

  submit() {
    this.AWS.predict('hello')
  }

}
