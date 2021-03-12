export interface User {
    email?: string
    username?: string
    password: string
    returnSecureToken?: boolean,
    token?: string
}

export interface UserInfo {
    provider: string
    name: string
    system: string
    hasQuestions: boolean
    questionIsAnswered: boolean
    mfa: boolean
}

export interface AuthResponce {
    idToken: string
    expiresIn: string
    email?: string
}

export interface ChangePass {
    idToken: string
    password: string
}

export interface SentAnswer {
    answer: string,
    rememberMe: boolean
}

export interface Filter {
    accountNumber?: string
    processDate?: Date 
    receiveDate?: Date
    recieveDate?: Date
    dateOfDeposite?: Date
    dateOfDeposit?: string
    dateOfService?: string
    lockbox?: string
    patientAccount?: string
    lastName?: string 
    firstName?: string
    payerName?: string
    submittedAmount?: string
    paidAmount?: string
    transactionId?: string
    payer?: string
    payerGroup?: string
    batchNumber?: string 
    paymentNumber?: string
    paymentAmount?: string
    fileName?: string 
    documentType?: string
    paymentType?: string
    provider?: string
    grouping?: string
    quantity?: string
    status?: string 
    queue?: string
    destinationQueues?: string
    thumbnails?: string 
    remitAmount?: string
    batch?: string
    TRN?: string
}