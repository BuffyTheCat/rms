export interface getQueuedItemsForQuery {
    "service" : string,
    "method" : string,
    "params" : {
      "queueItemTypeId" : string,
      "date" : string,
      "queueId" : number,
      "requestTicket" : {
        "id" : number,
        "pageNumber" : number
      },
      "pageNumber" : number,
      "lockboxNumber" : string,
      "indexStatus" : string,
      "pageSize" : number,
      "provider" : string,
      "payerName" : string,
      "showOtherUsersItems" : boolean,
      "status" : string,
      "batchNumber" : string
    }
}

export interface UpdateQueueItemStatusAndQueueId {
    "service" : string,
    "method" : string,
    "params" : {
      "queueItemId" : number,
      "status" : string
    }
}

export interface UpdateQueueItemStatusAndQueueIdResponce {
    "service" : string,
    "method" : string
}

export interface QueuedItemsForQuery {
    "service" : string,
    "method" : string,
    "params" : {
      "queueItemTypeId" : string,
      "date" : string,
      "requestTicket" : {
        "id" : number,
        "pageNumber" : number
      },
      "pageNumber" : number,
      "lockboxNumber" : string,
      "indexStatus" : string,
      "pageSize" : number,
      "provider" : string,
      "payerName" : string,
      "showOtherUsersItems" : boolean,
      "status" : string,
      "batchNumber" : string
    }
}

export interface GetParams {
    "service" : string,
    "method" : string,
    "params" : {
      "userId" : string,
    }
}

export interface GetTheme {
  "userId": number
}

export class FileNode {
  childGroups: FileNode[];
  name: string;
  expanded: boolean;
  assigned: boolean;
}

export interface QueuedItemsForQueryResponce {
    "service" : string,
    "method" : string,
    "payload" : QueuedItemsPayloadResponce
}

export interface QueuedItemsPayloadResponce {
    "results" : QueuedItemsResponce[],
    "count" : number,
    "page" : number,
    "total" : number,
    "requestTicket" : {
      "id" : number,
      "pageNumber" : number
    }
}

export interface QueuedItemsResponce {
    "$ref" ?: string,
    "queueItemId" ?: number,
    "status" ?: string,
    "completed"?: boolean,
    "lockStatus" ?: number,
    "printed" ?: boolean,
    "statusDate" ?: string,
    "queueDateId" ?: number,
    "queueDate" ?: string,
    "queueName" ?: string,
    "queueId" ?: number,
    "domainId" ?: number,
    "lockboxItemId" ?: number,
    "encounterId" ?: number,
    "lockboxNumber" ?: string,
    "batchNumber" ?: string,
    "dateOfDeposit" ?: string,
    "payerName" ?: string,
    "patientAccountNumber" ?: string,
    "dateOfService" ?: string,
    "submittedAmount" ?: number,
    "paymentAmount" ?: number,
    "lastName" ?: string,
    "firstName" ?: string,
    "domainName" ?: string,
    "queueItemTypeId" ?: string,
    "pageCount" ?: number,
    "archivedFileId" ?: number,
    "userId" ?: number,
    "enflag" ?: number,
    "lnflag" ?: number,
    "userName" ?: string,
    "archivedFileTypeId" ?: number,
    "checkNumber" ?: string,
    "remitDate" ?: string,
    "claimDate" ?: string,
    "noteCount" ?: number,
    "encounterIdList" ?: number[]
}

export interface theme {
  primary: string,
  firstSecondaryColor: string,
  secondSecondaryColor: string,
  thirdSecondaryColor: string,
  fourthSecondaryColor: string,
  fifthSecondaryColor: string,
  seventhSecondaryColor: string,
  sixthSecondaryColor: string,
  loginLogo?: File,
  defaultLogo?: string,
  applicationLogo?: File,
  secondaryLogo?: File,
}

export interface ParamsResponce {
  "useProviderInfofromEDI" ?: string[],
  "useProviderInfofromEDISelectedOption"?: string,
  "loginMethod" ?: string[],
  "loginMethodSelectedOption" ?: string,
  "lockbox" ?: string[],
  "lockBoxSelectedOption" ?: string,
  "Quantity" ?: string[],
  "quantitySelectedOption" ?: string,
  "provider" ?: string[],
  "providerSelectedOption" ?: string,
  "batch" ?: string[],
  "batchSelectedOption"?: string,
  "patient" ?: string[],
  "patientSelectedOption": string,
  "lastName" ?: string[],
  "lastNameSelectedOption": string,
  "firstName" ?: string[],
  "firstNameSelectedOption": string,
  "submittedAmount" ?: string[],
  "submittedAmountSelectedOption": string,
  "paidAmount" ?: string[],
  "paidAmountSelectedOption": string,
  "transactionId" ?: string[],
  "transactionIdSelectedOption": string,
  "payer" ?: string[],
  "payerSelectedOption": string,
  "paymentNumber" ?: string[],
  "paymentNumberSelectedOption": string,
  "paymentAmount" ?: string[],
  "paymentAmountSelectedOption": string,
  "paymentType" ?: string[],
  "paymentTypeSelectedOption": string,
  "payerGroup" ?: string[],
  "payerGroupSelectedOption": string,
  "TRN" ?: string[],
  "TRNSelectedOption": string,
  "payerName" ?: string[],
  "payerNameSelectedOptions": string,
  "batchNumber" ?: string[],
  "batchNumberSelectedOptions": string,
  "fileName" ?: string[],
  "fileNameSelectedOptions": string,
  "documentType" ?: string[],
  "documentTypeSelectedOptions": string,
  "grouping" ?: string[],
  "groupingSelectedOptions": string,
  "status" ?: string[],
  "statusSelectedOption": string,
  "queue" ?: string[],
  "queueSelectedOption": string,
  "destinationQueues" ?: string[],
  "destinationQueuesSelectedOption": string,
  "thumbnails" ?: string[],
  "thumbnailsSelectedOption": string,
}



export interface userInfo {
  "profilesAssigned": Array<dndItem>,
  "profilesUnassigned": Array<dndItem>,
  "rolesAssigned": {
    "manager" ?: Array<dndItem>,
    "admin" ?: Array<dndItem>
  },
  "rolesUnassigned": {
    "manager" ?: Array<dndItem>,
    "admin" ?: Array<dndItem>
  },
  "dashboardAssigned": Array<dndItem>,
  "dashboardUnassigned": Array<dndItem>,
  "reportsAssigned": {
    "Daily Acitivity" ?: Array<dndItem>,
    "all" ?: Array<dndItem>
  },
  "reportsUnassigned": {
    "Daily Acitivity" ?: Array<dndItem>,
    "all" ?: Array<dndItem>
  },
  "domains": {
    "RMS QA Domain" ?: nestedTableItem[],
    "RMS QA Domain 2" ?: nestedTableItem[]
  },
  "queues": {
    "Queue 1" ?: nestedTableItem[],
    "Queue 2" ?: nestedTableItem[]
  },

}

export interface nestedTableItem {
  name: string
  expanded: boolean
  assigned: boolean
  childGroups: nestedTableItem[]
}

export interface dndItem {
  "title": string,
}

export interface getNotesForDocument {
    "service" : string,
    "method" : string,
    "params" : {
      "fileId" : number
    }
}

export interface getNotesForDocumentResponce {
    "service" : string,
    "method" : string,
    "payload" : Array<note>
}


export interface note {
  "id" : number,
  "date" : string,
  "text" : string,
  "domainId" : number,
  "userId" : number,
  "userName" : string
}

export interface addDocumentNote {
  "service" : string,
  "method" : string,
  "params" : {
    "noteText" : string,
    "archivedFileId" : number
  }
}

export interface addDocumentNoteResponce {
  "service" : string,
  "method" : string,
}

export interface getQueueItemHistory {
  "service" : string,
  "method" : string,
  "params" : {
    "queueItemId" : number,
  }
}






  