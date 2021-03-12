import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QueuedItemsForQueryResponce, QueuedItemsForQuery, UpdateQueueItemStatusAndQueueId, UpdateQueueItemStatusAndQueueIdResponce, getNotesForDocument, getNotesForDocumentResponce, addDocumentNote, addDocumentNoteResponce, getQueueItemHistory, GetParams, ParamsResponce, userInfo, GetTheme, theme} from '../shared/interfaces/queued-items-interface';

@Injectable({providedIn: 'root'})

export class QueueService {
    constructor(private http: HttpClient) { }

    getQueuedItemsForQuery(payload: QueuedItemsForQuery, response: QueuedItemsForQueryResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    getParams(payload: GetParams, response: ParamsResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    getTheme(payload: GetTheme, response: theme): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    getUserInfo(payload: GetParams, response: userInfo): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    updateQueueItemStatusAndQueueId(payload: UpdateQueueItemStatusAndQueueId, response: UpdateQueueItemStatusAndQueueIdResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    getNotesForDocument(payload: getNotesForDocument, response: getNotesForDocumentResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    addDocumentNote(payload: addDocumentNote, response: addDocumentNoteResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }

    getQueueItemHistory(payload: getQueueItemHistory, response: QueuedItemsForQueryResponce): Observable<any> {
        // send your request, for example:  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, payload)
        return of(response)
    }
}

