import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Call } from 'src/app/shared/models/call.model';
import { ListService } from 'src/app/shared/services/list.service';
import { CallDetailComponent } from '../call-detail/call-detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public callList: Array<Call> = [];
  public modalRef: BsModalRef;
  public selectedCall: Call;

  modalConfigs = {
    backdrop: true,
    class: 'modal-xl'
  }

  constructor(
    private listService: ListService,
    private modalService: BsModalService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    const data = {
      offset: 1,
      limit: 10
    }
    const query = this.listService.getPaginatedList(data);
    query.valueChanges.subscribe((response: any) => {
      this.callList = response.data.paginatedCalls.nodes;
      this.ngxService.stop();
    }, (error: any) => {
      this.ngxService.stop();
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalConfigs)
  }

  showCallDetails(template: any, call: Call) {
    this.selectedCall = call;
    this.openModal(template);
  }

}
