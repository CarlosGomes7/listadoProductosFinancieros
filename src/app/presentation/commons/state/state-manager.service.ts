import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskModel } from '../../../domain/models/product-financial';


@Injectable({
	providedIn: 'root'
})
export class StateManagerService {
	taskSelected:TaskModel = {
		title: '',
		description: '',
		dueDate: new Date(),
		priority: '',
		labels: []
	};



	
}
