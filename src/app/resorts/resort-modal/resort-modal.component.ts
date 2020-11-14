import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Resort } from '../shared/resort.model';

@Component({
    selector: 'app-resort-modal',
    templateUrl: './resort-modal.component.html',
    styleUrls: ['resort-modal.component.css']
})

export class ResortModalComponent {
    constructor(public modalService: ModalService) {
    }
    selectedNav = 'Info';
    showReviewForm = false;

    handleModalNavigation(term: string) {
        this.selectedNav = term;
    }

    toggleReviewForm() {
        this.showReviewForm= !this.showReviewForm;
    }

    close() {
        this.modalService.destroy();
    }
}
