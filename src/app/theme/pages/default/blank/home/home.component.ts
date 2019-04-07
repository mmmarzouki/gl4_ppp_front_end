import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../_services/api.service';
import { Project } from '../../../../../models/project';
import { Collaborator } from '../../../../../models/collaborator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleType } from '../../../../../models/types/roletype';
import * as moment from 'moment';
import { CollaboratorRole } from '../../../../../models/CollaboratorRole';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model: Project[];
  project: Project;
  addProject = false;
  collaboratorsNumber = 1;
  roles = RoleType;
  collaborators: Collaborator[];
  submitted = false;
  success = false;
  public form: FormGroup;
  public collaboratorsList: FormArray;


  constructor(private api: ApiService, private fb: FormBuilder) { 
    this.api.classname = "collaborators"
  }

  add()
  {
    this.addProject = true;
  }
  ngOnInit() {
    this.api.getMany<Collaborator>().subscribe(collaborators => {
      this.collaborators = collaborators;
    })

    this.api.classname = "project"

    this.api.getMany<Project>().subscribe(projects => {
      this.model = projects;
    })
    this.project = new Project();

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.required],
      startDate: [ moment().format('YYYY-MM-DD'), Validators.required],
      endDate: [ moment().format('YYYY-MM-DD'), Validators.required],
      collaborators: this.fb.array([this.createCollaborator()])
    });
    this.collaboratorsList = this.form.get('collaborators') as FormArray;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  addCollaborator()
  {
    this.collaboratorsList.push(this.createCollaborator());
  }
  removeLastCollaborator(index){
    this.collaboratorsList.removeAt(index);
  }


  createCollaborator(): FormGroup {
    return this.fb.group({
      collaboratorId: ["", Validators.compose([Validators.required])],
      role: ["", Validators.compose([Validators.required])],
    });
  }

  get collaboratorsFormGroup() {
    return this.form.get('collaborators') as FormArray;
  }

  get Roles()
  {
    return Object.values(this.roles);
  }
  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.api.classname = "project";
      this.project.name = this.form.controls.name.value;
      this.project.collaborators = this.form.controls.collaborators.value;
      this.project.startDate = this.form.controls.startDate.value;
      this.project.endDate = this.form.controls.endDate.value;
      this.project.description = this.form.controls.description.value;

      this.api.add(this.project).subscribe(resp => {
        this.success = true;
        this.model.push(this.project);
        this.project = new Project();
      });
    }
  }
}
