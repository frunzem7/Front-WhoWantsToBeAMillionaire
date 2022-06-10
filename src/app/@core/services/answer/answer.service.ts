import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {AnswerDto} from "../../dtos/AnswerDto";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private port = "8443";
  private url = `http://localhost:${this.port}/api/service/answers`

  constructor(
    private http: HttpClient
  ) {
  }

  save(mainPage: AnswerDto): Promise<AnswerDto> {
    return lastValueFrom(this.http.post<AnswerDto>(`${this.url}/`, mainPage));
  }

  getById(id: number): Promise<AnswerDto[]> {
    return lastValueFrom(this.http.get<AnswerDto[]>(`${this.url}/${id}`));
  }

  getAll(): Promise<AnswerDto[]> {
    return lastValueFrom(this.http.get<AnswerDto[]>(`${this.url}/`));
  }

  update(mainPage: AnswerDto): Promise<AnswerDto> {
    return lastValueFrom(this.http.put<AnswerDto>(`${this.url}/`, mainPage));
  }

  deleteById(id: number): Promise<AnswerDto> {
    return lastValueFrom(this.http.delete<AnswerDto>(`${this.url}/${id}`));
  }

  getAllByQuestionId(id: string): Promise<AnswerDto> {
    return lastValueFrom(this.http.delete<AnswerDto>(`${this.url}/all/question/${id}`));
  }
}
