import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ComponentDataService {
  private data = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.data.next(data);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
}
