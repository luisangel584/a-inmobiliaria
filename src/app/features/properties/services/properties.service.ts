import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PropertiesResponse, PropertyDetail } from '../interfaces/property.interface';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  readonly http = inject(HttpClient);

  getProperties(page = 1): Observable<PropertiesResponse> {
    return this.http.get<PropertiesResponse>(environment.propertiesUrl, {
      params: { page },
    });
  }

  getPropertyById(id: string): Observable<PropertyDetail> {
    return this.http.get<PropertyDetail>(environment.propertyDetailUrl(id));
  }
}
