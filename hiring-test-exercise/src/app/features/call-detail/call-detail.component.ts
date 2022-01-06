import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Call } from 'src/app/shared/models/call.model';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit {

  @Input() call: Call;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.hide();
  }

}
