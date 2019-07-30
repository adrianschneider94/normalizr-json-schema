export interface Attachment {
    id: string;
    name: string;
    taskId: string;
    description: string;
    type: string;
    url: string;

    [k: string]: any;
}

export interface IdentityLink {
    userId: string;
    groupId: string;
    type: string;

    [k: string]: any;
}

export interface FormKey {
    key: string;
    contextPath: string;
}

export interface Task {
    id?: string;
    name?: string;
    assignee?: string | null;
    created?: string | null;
    due?: string | null;
    followUp?: string | null;
    delegationState?: string | null;
    description?: string | null;
    executionId?: string | null;
    owner?: string | null;
    parentTaskId?: string | null;
    priority?: number;
    processDefinitionId?: string | null;
    processInstanceId?: string | null;
    taskDefinitionKey?: string | null;
    caseExecutionId?: string | null;
    caseInstanceId?: string | null;
    caseDefinitionId?: string | null;
    suspended?: boolean;
    formKey?: string | null;
    tenantId?: string | null;

    [k: string]: any;
}

export interface Variable {
    value:
        | {
        [k: string]: any;
    }
        | string
        | number
        | boolean;
    type: string;
    valueInfo: {
        objectTypeName: string;
        serializationDataFormat: string;
    };
}

export type CandidateGroupCount = {
    groupName: string;
    taskCount: number;
}[];

export interface Count {
    count: number;
}

export interface Comment {
    id: string;
    userId: string;
    taskId: string;
    time: string;
    message: string;

    [k: string]: any;
}

export type AttachmentList = Attachment[];

export interface Attachment {
    id: string;
    name: string;
    taskId: string;
    description: string;
    type: string;
    url: string;

    [k: string]: any;
}

export type CommentList = Comment[];

export interface Comment {
    id: string;
    userId: string;
    taskId: string;
    time: string;
    message: string;

    [k: string]: any;
}

export interface VariableMap {
    [k: string]: Variable;
}

export interface Variable {
    value?:
        | {
        [k: string]: any;
    }
        | string
        | number
        | boolean;
    type?: string;
    valueInfo?: {
        objectTypeName: string;
        serializationDataFormat: string;
    };

    [k: string]: any;
}

export type IdentityLinkList = IdentityLink[];

export interface IdentityLink {
    userId: string;
    groupId: string;
    type: string;

    [k: string]: any;
}

export interface TaskList {
    id?: string;
    tasks?: Task[];

    [k: string]: any;
}

export interface Task {
    id?: string;
    name?: string;
    assignee?: string | null;
    created?: string | null;
    due?: string | null;
    followUp?: string | null;
    delegationState?: string | null;
    description?: string | null;
    executionId?: string | null;
    owner?: string | null;
    parentTaskId?: string | null;
    priority?: number;
    processDefinitionId?: string | null;
    processInstanceId?: string | null;
    taskDefinitionKey?: string | null;
    caseExecutionId?: string | null;
    caseInstanceId?: string | null;
    caseDefinitionId?: string | null;
    suspended?: boolean;
    formKey?: string | null;
    tenantId?: string | null;

    [k: string]: any;
}
