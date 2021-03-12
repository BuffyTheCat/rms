import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { getQueuedItemsForQueryAction, getQueuedItemsForQuerySuccessAction, UpdateQueueItemStatusAndQueueIdAction, getNotesForDocumentAction, getNotesForDocumentActionSuccessAction, addDocumentNoteAction, getQueueItemHistoryAction, getQueueItemHistorySuccessAction, editTransactionAction, getParamsAction, getParamsSuccessAction, getUserInfoAction, getUserInfoSuccessAction, getThemeAction, getThemeSuccessAction } from './main.action';
import { QueueService } from 'src/app/services/queueService.service';
import { QueuedItemsForQueryResponce, UpdateQueueItemStatusAndQueueIdResponce, getNotesForDocumentResponce, ParamsResponce, userInfo, theme } from '../../shared/interfaces/queued-items-interface';
import { MatDialog } from '@angular/material/dialog';
import { DocumentNotesComponent } from '../../shared/components/document-notes/document-notes.component'
import { HistoryTrackingComponent } from 'src/app/shared/components/history-tracking/history-tracking.component';
import { EditModalComponent } from 'src/app/shared/components/edit-modal/edit-modal.component';
import { ItemHistoryComponent } from 'src/app/shared/components/item-history/item-history.component';


const getQueuedItemsForQueryResponse: QueuedItemsForQueryResponce = {
  "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
  "method" : "getQueuedItemsForQuery",
  "payload" : {
    "results" : [ {
      "queueItemId" : 1163,
      "status" : "COMPLETED",
      "completed": true,
      "lockStatus" : 1,
      "printed" : true,
      "statusDate" : "2020-04-24T10:40:21-05",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 42,
      "lockboxItemId" : 2355,
      "encounterId" : 2382,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "TOGETHER HEALTH",
      "patientAccountNumber" : "300001587|",
      "dateOfService" : "2017-02-01T00:00:00-06",
      "submittedAmount" : 2054.0,
      "paymentAmount" : 1196.63,
      "lastName" : "FEET",
      "firstName" : "KERRY",
      "domainName" : "John Test Domain 3061",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6778,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "63164893",
      "remitDate" : "2019-09-29",
      "claimDate" : "2019-09-30",
      "encounterIdList" : [ 2382 ]
    }, {
      "queueItemId" : 1164,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 1,
      "lockboxItemId" : 2365,
      "encounterId" : 2401,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "OTHER HEALTH PLAN",
      "patientAccountNumber" : "AA4456790",
      "dateOfService" : "2017-09-02T00:00:00-05",
      "submittedAmount" : 1005.1,
      "paymentAmount" : 372.8,
      "lastName" : "FRENCH",
      "firstName" : "CAITLYNN",
      "domainName" : "RMS QA Domain",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6806,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "178910",
      "remitDate" : "2019-09-29",
      "claimDate" : "2019-09-30",
      "encounterIdList" : [ 2401 ]
    }, {
      "queueItemId" : 1165,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 2,
      "lockboxItemId" : 2366,
      "encounterId" : 2402,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "HEALTHGOOD",
      "patientAccountNumber" : "300068134",
      "submittedAmount" : 9249.0,
      "paymentAmount" : 753.06,
      "lastName" : "JENNY",
      "firstName" : "JOHNNY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6807,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "CB82435816",
      "remitDate" : "2019-09-29",
      "encounterIdList" : [ 2402 ]
    }, {
      "queueItemId" : 1166,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 2,
      "lockboxItemId" : 2367,
      "encounterId" : 2404,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "SKY HEALTHCARE",
      "paymentAmount" : 285.0,
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 4,
      "archivedFileId" : 6808,
      "userId" : 27,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "63164893",
      "encounterIdList" : [ 2404 ]
    }, {
      "queueItemId" : 1168,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 1,
      "lockboxItemId" : 2369,
      "encounterId" : 2406,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "PLAN ADMINISTRATORS",
      "patientAccountNumber" : "300112590|",
      "submittedAmount" : 363.0,
      "paymentAmount" : 192.85,
      "lastName" : "SLOUGH",
      "firstName" : "SURREY",
      "domainName" : "RMS QA Domain",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6810,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "7132",
      "remitDate" : "2019-09-29",
      "encounterIdList" : [ 2406 ]
    }, {
      "queueItemId" : 1169,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 2,
      "lockboxItemId" : 2370,
      "encounterId" : 2407,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "PLAN ADMINISTRATORS",
      "patientAccountNumber" : "AA9988312",
      "submittedAmount" : 119.0,
      "paymentAmount" : 226.1,
      "lastName" : "LEAF",
      "firstName" : "RICHARD",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6811,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "78910",
      "remitDate" : "2019-09-29",
      "encounterIdList" : [ 2407 ]
    }, {
      "queueItemId" : 1170,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-11-22T09:15:13-06",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 2,
      "lockboxItemId" : 2371,
      "encounterId" : 2409,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "CUBE",
      "patientAccountNumber" : "300335567",
      "submittedAmount" : 300.0,
      "paymentAmount" : 41.76,
      "lastName" : "ROCK",
      "firstName" : "KERRY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 6,
      "archivedFileId" : 6812,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "4744680",
      "remitDate" : "2019-09-29",
      "encounterIdList" : [ 2409 ]
    }, {
      "queueItemId" : 1167,
      "status" : "HOLD",
      "lockStatus" : 0,
      "statusDate" : "2020-03-12T12:40:02-05",
      "queueDateId" : 161,
      "queueDate" : "2019-09-27T00:00:00-05",
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 15,
      "domainId" : 1,
      "lockboxItemId" : 2368,
      "encounterId" : 2405,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-09-27T00:00:00-05",
      "payerName" : "LUNAR HEALTH",
      "patientAccountNumber" : "300078123",
      "submittedAmount" : 71.0,
      "paymentAmount" : 67.45,
      "lastName" : "ADAMS",
      "firstName" : "HENRY",
      "domainName" : "RMS QA Domain",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 4,
      "archivedFileId" : 6809,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "91789",
      "remitDate" : "2019-09-29",
      "encounterIdList" : [ 2405 ]
    }, {
      "$ref" : "$ref/71335e26-80e0-4d5e-8975-7eb96708beee",
      "queueItemId" : 1069,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:00-05",
      "queueDateId" : 184,
      "queueDate" : "2020-02-05T00:00:00-06",
      "queueName" : "COB",
      "queueId" : 21,
      "domainId" : 2,
      "lockboxItemId" : 2158,
      "encounterId" : 2042,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "TOGETHER HEALTH",
      "patientAccountNumber" : "300001587|",
      "dateOfService" : "2017-02-01T00:00:00-06",
      "submittedAmount" : 2054.0,
      "paymentAmount" : 1196.63,
      "lastName" : "FEET",
      "firstName" : "KERRY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6128,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "63164893",
      "remitDate" : "2019-08-22",
      "claimDate" : "2019-08-23",
      "noteCount" : 1,
      "encounterIdList" : [ 2042 ]
    }, {
      "queueItemId" : 1070,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:28-05",
      "queueDateId" : 185,
      "queueDate" : "2020-02-05T00:00:00-06",
      "queueName" : "COB",
      "queueId" : 21,
      "domainId" : 2,
      "lockboxItemId" : 2168,
      "encounterId" : 2061,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "OTHER HEALTH PLAN",
      "patientAccountNumber" : "AA4456790",
      "dateOfService" : "2017-09-02T00:00:00-05",
      "submittedAmount" : 1005.1,
      "paymentAmount" : 372.8,
      "lastName" : "FRENCH",
      "firstName" : "CAITLYNN",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6156,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "178910",
      "remitDate" : "2019-08-22",
      "claimDate" : "2019-08-23",
      "encounterIdList" : [ 2061 ]
    }, {
      "queueItemId" : 1072,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:29-05",
      "queueDateId" : 186,
      "queueDate" : "2020-02-05T00:00:00-06",
      "queueName" : "COB",
      "queueId" : 21,
      "domainId" : 2,
      "lockboxItemId" : 2170,
      "encounterId" : 2064,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "SKY HEALTHCARE",
      "patientAccountNumber" : "300009876|",
      "submittedAmount" : 300.0,
      "paymentAmount" : 285.0,
      "lastName" : "ROBERTSON",
      "firstName" : "RACHELLE",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 4,
      "archivedFileId" : 6158,
      "enflag" : 0,
      "lnflag" : 0,
      "archivedFileTypeId" : 1,
      "checkNumber" : "63164893",
      "remitDate" : "2019-08-22",
      "encounterIdList" : [ 2064 ]
    }, {
      "$ref": "$ref/71335e26-80e0-4d5e-8975-7eb96708beee",
      "queueItemId" : 1073,
      "status" : "UNPROCESSED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:30-05",
      "queueDateId" : 147,
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 30,
      "domainId" : 2,
      "lockboxItemId" : 2171,
      "encounterId" : 2065,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "LUNAR HEALTH",
      "patientAccountNumber" : "300078123",
      "submittedAmount" : 71.0,
      "paymentAmount" : 67.45,
      "lastName" : "ADAMS",
      "firstName" : "HENRY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 4,
      "archivedFileId" : 6159,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "91789",
      "remitDate" : "2019-08-22",
      "encounterIdList" : [ 2065 ]
    }, {
      "queueItemId" : 1074,
      "status" : "UNPROCESSED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:31-05",
      "queueDateId" : 147,
      "queueName" : "OTHERS REMIT POST",
      "queueId" : 13,
      "domainId" : 2,
      "lockboxItemId" : 2172,
      "encounterId" : 2066,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "PLAN ADMINISTRATORS",
      "patientAccountNumber" : "300112590|",
      "submittedAmount" : 363.0,
      "paymentAmount" : 192.85,
      "lastName" : "SLOUGH",
      "firstName" : "SURREY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6160,
      "userId" : 29489,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "MedRxTestUser1",
      "archivedFileTypeId" : 1,
      "checkNumber" : "7132",
      "remitDate" : "2019-08-22",
      "encounterIdList" : [ 2066 ]
    }, {
      "queueItemId" : 1076,
      "status" : "UNPROCESSED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:33-05",
      "queueDateId" : 147,
      "queueName" : "DEFAULT REMIT POST",
      "queueId" : 30,
      "domainId" : 2,
      "lockboxItemId" : 2174,
      "encounterId" : 2069,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "CUBE",
      "patientAccountNumber" : "300335567",
      "submittedAmount" : 300.0,
      "paymentAmount" : 41.76,
      "lastName" : "ROCK",
      "firstName" : "KERRY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 6,
      "archivedFileId" : 6162,
      "userId" : 29489,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "MedRxTestUser1",
      "archivedFileTypeId" : 1,
      "checkNumber" : "4744680",
      "remitDate" : "2019-08-22",
      "encounterIdList" : [ 2069 ]
    }, {
      "queueItemId" : 1071,
      "status" : "COMPLETED",
      "lockStatus" : 0,
      "statusDate" : "2019-08-23T14:16:29-05",
      "queueDateId" : 300,
      "queueName" : "COB",
      "queueId" : 21,
      "domainId" : 2,
      "lockboxItemId" : 2169,
      "encounterId" : 2062,
      "lockboxNumber" : "121212",
      "batchNumber" : "001010",
      "dateOfDeposit" : "2019-08-20T00:00:00-05",
      "payerName" : "HEALTHGOOD",
      "patientAccountNumber" : "300068134",
      "submittedAmount" : 9249.0,
      "paymentAmount" : 753.06,
      "lastName" : "JENNY",
      "firstName" : "JOHNNY",
      "domainName" : "rms",
      "queueItemTypeId" : "REMIT_POST",
      "pageCount" : 3,
      "archivedFileId" : 6157,
      "userId" : 27,
      "enflag" : 0,
      "lnflag" : 0,
      "userName" : "testuser2",
      "archivedFileTypeId" : 1,
      "checkNumber" : "CB82435816",
      "remitDate" : "2019-08-22",
      "encounterIdList" : [ 2062 ]
    } ],
    "count" : 16,
    "page" : 0,
    "total" : 7241.83,
    "requestTicket" : {
      "id" : 3,
      "pageNumber" : 0
    }
  }
}

const updateQueueItemStatusAndQueueIdResponse: UpdateQueueItemStatusAndQueueIdResponce = {
  "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
  "method" : "updateQueueItemStatusAndQueueId"
}

const addDocumentNoteResponce: UpdateQueueItemStatusAndQueueIdResponce = {
  "service" : "com.rms.mbx.gui.client.workflowmvc.QueueService",
  "method" : "updateQueueItemStatusAndQueueId"
}

const getNotesForDocumentResponce: getNotesForDocumentResponce = {
  "service" : "com.rms.mbx.gui.client.encounter.EncounterService",
  "method" : "getNotesForDocument",
  "payload" : [ {
    "id" : 177,
    "date" : "2020-04-24T10:02:43-05",
    "text" : "Test Note",
    "domainId" : 2,
    "userId" : 27,
    "userName" : "testuser2"
  },
  {
    "id" : 177,
    "date" : "2020-04-24T10:02:43-05",
    "text" : "Test Note1",
    "domainId" : 2,
    "userId" : 27,
    "userName" : "testuser2"
  },
  {
    "id" : 177,
    "date" : "2020-04-24T10:02:43-05",
    "text" : "Test Note2",
    "domainId" : 2,
    "userId" : 27,
    "userName" : "testuser2"
  },
  ]
}

const themeResponse: theme = {
  "primary": "#455A64",
  "firstSecondaryColor": "#8ABD0F",
  "secondSecondaryColor": "#C4F056",
  "thirdSecondaryColor": "#455A64",
  "fourthSecondaryColor": "#EB5757",
  "fifthSecondaryColor": "#FAFAFA",
  "seventhSecondaryColor": "#FFFFFF",
  "sixthSecondaryColor": "#E5E6E7",
}

const paramsResponse: ParamsResponce = {
  "useProviderInfofromEDI": ['Yes', 'No'],
  "useProviderInfofromEDISelectedOption": 'Yes',
  "loginMethod": ['Basic', 'MFA', 'Token MFA'],
  "loginMethodSelectedOption": 'Basic',
  "lockbox": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "lockBoxSelectedOption": '',
  "Quantity": ['015', '016', '17'],
  "quantitySelectedOption": '',
  "provider": ['RMS QA Domain', 'RMS QA Domain 2', 'RMS QA Domain 3'],
  "providerSelectedOption": 'RMS QA Domain',
  "batch": ['batch 1', 'batch 2', 'batch 3'],
  "batchSelectedOption": '',
  "patient": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "patientSelectedOption": '',
  "lastName": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "lastNameSelectedOption": '',
  "firstName": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "firstNameSelectedOption": '',
  "submittedAmount": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "submittedAmountSelectedOption": '',
  "paidAmount": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "paidAmountSelectedOption": '',
  "transactionId": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "transactionIdSelectedOption": '',
  "payer": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "payerSelectedOption": '',
  "paymentNumber": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "paymentNumberSelectedOption": '',
  "paymentAmount": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "paymentAmountSelectedOption": '',
  "paymentType": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "paymentTypeSelectedOption": '',
  "payerGroup": ['Group 1', 'Group 2', 'Group 3'],
  "payerGroupSelectedOption": '',
  "TRN": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  "TRNSelectedOption": '',
  "payerName": ['Randall Cooper', 'Randall Cooper2', 'Randall Cooper3'],
  "payerNameSelectedOptions": '',
  "batchNumber": ['924576', '9245761', '9245762'],
  "batchNumberSelectedOptions": '',
  "fileName": ['Gorje Furman', 'Gorje Furman 2', 'Gorje Furman 3'],
  "fileNameSelectedOptions": '',
  "documentType": ['Patray', 'Patray 2', 'Patray 3'],
  "documentTypeSelectedOptions": '',
  "grouping": ['File name', 'Batch Number', 'Lockbox', 'Payer Group', 'Payer Name', 'Type', 'Segregation Group'],
  "groupingSelectedOptions": '',
  "status": ['Unpocessed', 'Pocessed'],
  "statusSelectedOption": 'Unpocessed',
  "queue": ['Default', 'Default 2', 'Default 3'],
  "queueSelectedOption": 'Default',
  "destinationQueues": ['0St Johns RMS Health System15', '0St Johns RMS Health System16', '0St Johns RMS Health System17'],
  "destinationQueuesSelectedOption": '0St Johns RMS Health System15',
  "thumbnails": ['Govemment', 'Govemment 2', 'Govemment 3', 'Govemment 4'],
  "thumbnailsSelectedOption": 'Govemment',
}

const userInfoResponse: userInfo = {
  profilesAssigned: [],
  profilesUnassigned: [
    {
      title: "Profile 1",
    },
    {
      title: "Profile 2",
    },
    {
      title: "Profile 3",
    },
    {
      title: "Profile 4",
    },
  ],
  rolesAssigned: {
    "manager": [],
    "admin": []
  },
  rolesUnassigned: {
    "manager": [
      {
        title: "ADD_DOMAIN",
      },
      {
        title: "ADMIN_VIEW",
      },
      {
        title: "ASSIGN_CHILD_DOMAIN_ACCESS",
      },
    ],
    "admin": [
      {
        title: "ADD_DOMAIN",
      },
      {
        title: "ADMIN_VIEW",
      },
      {
        title: "ASSIGN_CHILD_DOMAIN_ACCESS",
      },
      {
        title: "ASSIGN_DASHBOARDS",
      },
      {
        title: "ASSIGN_PROFILES",
      },
      {
        title: "ASSIGN_QUEUES",
      },
      {
        title: "COPY_PROFILE",
      },
      {
        title: "CREATE_LOCKBOX",
      },
    ]
  },
  dashboardAssigned: [
    {
      title: "Denial Queue Item",
    },
    {
      title: "Correspondence Queue Item",
    },
  ],
  dashboardUnassigned: [
    {
      title: "Revenue Comparison",
    },
    {
      title: "Payment Mix",
    },
    {
      title: "Remit Queue Item",
    },
  ],
  reportsAssigned: {
    "Daily Acitivity": [
      {
        title: "Workflow Queue",
      },
      {
        title: "Lockbox Activity",
      },
    ],
    "all": []
  },
  reportsUnassigned: {
    "Daily Acitivity": [
      {
        title: "Outstanding ACH",
      },
      {
        title: "Provider Level Adjustment",
      },
      {
        title: "Check Detail",
      },
      {
        title: "Correspondence Indexing",
      },
      {
        title: "Correspondence Indexing",
      },
    ],
    "all": [
      {
        title: "Outstanding ACH",
      },
      {
        title: "Provider Level Adjustment",
      }
    ]
  },
  domains: {
    "RMS QA Domain": [
      {
      'name': 'Group 1',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1(Group 1)',
          'expanded': false,
          'assigned': true,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 1)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 1)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 2',
      'expanded': false,
      'assigned': true,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 2)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 3',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 3)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 3)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 3)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
    ],
    "RMS QA Domain 2": [
      {
      'name': 'Group 1',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1(Group 1)',
          'expanded': false,
          'assigned': true,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 1)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 1)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 2',
      'expanded': false,
      'assigned': true,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 2)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
    ],
  },
  queues: {
    "Queue 1": [
      {
      'name': 'Group 1',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1(Group 1)',
          'expanded': false,
          'assigned': true,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 1)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 1)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 2',
      'expanded': false,
      'assigned': true,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 2)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 3',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 3)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 3)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 3)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
    ],
    "Queue 2": [
      {
      'name': 'Group 1',
      'expanded': false,
      'assigned': false,
      'childGroups': [
        {
          'name': 'Childgroup 1(Group 1)',
          'expanded': false,
          'assigned': true,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 1)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 1)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
        {
      'name': 'Group 2',
      'expanded': false,
      'assigned': true,
      'childGroups': [
        {
          'name': 'Childgroup 1 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': []
        },
        {
          'name': 'Childgroup 2 (Group 2)',
          'expanded': false,
          'assigned': false,
          'childGroups': [
            {
              'name': 'Child of child (Group 2)',
              'expanded': false,
              'assigned': false,
              'childGroups': []
            }
          ]
        }
        ]
      },
    ],
  },
}

@Injectable()
export class QueueEffects {

  constructor(
      private actions$: Actions,
      private QueueService: QueueService,
      public dialog: MatDialog,
  ) { }

  changeQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateQueueItemStatusAndQueueIdAction),
      switchMap((payload) => this.QueueService.updateQueueItemStatusAndQueueId(payload, updateQueueItemStatusAndQueueIdResponse).toPromise()),
      switchMap((payload) => this.QueueService.getQueuedItemsForQuery(payload, getQueuedItemsForQueryResponse).toPromise()),
      map((res) => {
        return getQueuedItemsForQuerySuccessAction({items: res.payload.results})
    }),
  ));

  GetQueueBatches$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getQueuedItemsForQueryAction),
    switchMap((payload) => this.QueueService.getQueuedItemsForQuery(payload, getQueuedItemsForQueryResponse).toPromise()),
    map((res) => {
      return getQueuedItemsForQuerySuccessAction({items: res.payload.results})
    }),
  ));

  GetTheme$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getThemeAction),
    switchMap((payload) => this.QueueService.getTheme(payload, themeResponse).toPromise()),
    map((res) => {
      return getThemeSuccessAction({theme: res})
    }),
  ));

  GetParams$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getParamsAction),
    switchMap((payload) => this.QueueService.getParams(payload, paramsResponse).toPromise()),
    map((res) => {
      return getParamsSuccessAction({params: res})
    }),
  ));

  GetUserInfo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUserInfoAction),
    switchMap((payload) => this.QueueService.getUserInfo(payload, userInfoResponse).toPromise()),
    map((res) => {
      return getUserInfoSuccessAction({userInfo: res})
    }),
  ));

  GetNotes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getNotesForDocumentAction),
    switchMap((payload) => this.QueueService.getNotesForDocument(payload, getNotesForDocumentResponce).toPromise()),
    map((res) => {
      this.dialog.open(DocumentNotesComponent, {
        data: res.payload
      });
      return getNotesForDocumentActionSuccessAction({note: res.payload})
    }),
  ));

  AddNotes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addDocumentNoteAction),
    switchMap((payload) => this.QueueService.addDocumentNote(payload, addDocumentNoteResponce).toPromise()),
    map(() => {
      this.dialog.closeAll();
      return
    }),
  ), { dispatch: false });

  GetHistory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getQueueItemHistoryAction),
    switchMap((payload) => this.QueueService.getQueueItemHistory(payload, getQueuedItemsForQueryResponse).toPromise()),
    map((res) => {
      this.dialog.open(ItemHistoryComponent, {
        data: res.payload.results
      });
      return 
    }),
  ), { dispatch: false });

  EditTransaction$ = createEffect(() =>
  this.actions$.pipe(
    ofType(editTransactionAction),
    map((res) => {
      this.dialog.open(EditModalComponent, {
        data: res
      });
      return
    }),
  ), { dispatch: false });
}





