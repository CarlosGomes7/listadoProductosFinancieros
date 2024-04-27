import { Component } from '@angular/core';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  showLoader:boolean=false;

  constructor(private utility: UtilityService) {}

  ngOnInit(): void {
		this.loaderSubscription();
	}

  private loaderSubscription() {
		this.utility.showLoader$.subscribe((state) => {
			this.showLoader = state;
		});
	}
}
