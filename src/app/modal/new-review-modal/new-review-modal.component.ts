import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewPostagemData } from '../../model/psotagem.model';

type ModalOutputData = Omit<NewPostagemData, 'criadorId'>;

@Component({
  selector: 'app-new-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-review-modal.component.html',
  styleUrls: ['./new-review-modal.component.css']
})
export class NewReviewModalComponent {
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveReview = new EventEmitter<ModalOutputData>();

  formData = { 
    titulo: "",
    autorObra: "",
    conteudo: ""
  };

  private resetForm() {
    this.formData = {
      titulo: "",
      autorObra: "",
      conteudo: ""
    };
  }

  handleSubmit() {
    const combinedTitle = `${this.formData.titulo} (por ${this.formData.autorObra})`;

    const dataToEmit: ModalOutputData = {
      titulo: combinedTitle,
      conteudo: this.formData.conteudo,
      autorObra: this.formData.autorObra  
    };

    this.saveReview.emit(dataToEmit);
    this.resetForm();
  }

  handleCancel() {
    this.closeModal.emit();
    this.resetForm();
  }
}