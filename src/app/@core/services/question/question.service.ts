import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {QuestionDto} from "../../dtos/QuestionDto";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private port = "8443";
  private url = `http://localhost:${this.port}/api/service/questions`

  constructor(
    private http: HttpClient
  ) {
  }

  save(mainPage: QuestionDto): Promise<QuestionDto> {
    return lastValueFrom(this.http.post<QuestionDto>(`${this.url}/`, mainPage));
  }

  getById(id: number): Promise<QuestionDto> {
    return lastValueFrom(this.http.get<QuestionDto>(`${this.url}/${id}`));
  }

  getAll(): Promise<QuestionDto[]> {
    return lastValueFrom(this.http.get<QuestionDto[]>(`${this.url}/`));
  }

  update(mainPage: QuestionDto): Promise<QuestionDto> {
    return lastValueFrom(this.http.put<QuestionDto>(`${this.url}/`, mainPage));
  }

  deleteById(id: number): Promise<QuestionDto> {
    return lastValueFrom(this.http.delete<QuestionDto>(`${this.url}/${id}`));
  }
}
