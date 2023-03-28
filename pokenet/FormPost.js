export class FormPost{
  constructor(idForm, idTextarea, idULPost) {
      this.Form = document.getElementById(idForm);
      this.Textarea = document.getElementById(idTextarea);
      this.ulpost = document.getElementById(idULPost);
      this.addSubmit();
 
    }
   
    onSubmit(func){
       this.Form.addEventListener('submit',func)
    }
   addSubmit(){
    const handleSubmit = (event) => {
       event.preventDefault();
       console.log('Evento add.')

    }
    this.onSubmit(handleSubmit)
      
 }
  
}
const postform = new FormPost('formpost','textarea','posts')
