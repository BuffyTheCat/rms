import { createAction, props } from '@ngrx/store';
import { TodoItemFlatNode } from 'src/app/shared/components/nested-list/nested-list.component';
import { QueuedItemsResponce, QueuedItemsForQuery, UpdateQueueItemStatusAndQueueId, getNotesForDocument, getNotesForDocumentResponce, addDocumentNote, getQueueItemHistory, QueuedItemsForQueryResponce, GetParams, ParamsResponce, userInfo, dndItem, theme } from '../../shared/interfaces/queued-items-interface';

export const getThemeAction = createAction(
    '[theme] getThemeAction',
    props<{userId: number}>()
);

export const getThemeSuccessAction = createAction(
    '[theme] getThemeSuccessAction',
    props<{theme: theme}>()
);

export const setDarkModeAction = createAction(
    '[theme] setDarkModeAction',
    props<{isDarkMode: boolean}>()
);

export const setThemeAction = createAction(
    '[theme] setThemeAction',
    props<{theme: theme}>()
);

export const changeGlobalProviderAction = createAction(
    '[header] changeGlobalProviderAction',
    props<{provider: string}>()
);

export const getQueuedItemsForQueryAction = createAction(
    '[Workflow] get queued items for query',
    props<QueuedItemsForQuery>()
);

export const getQueuedItemsForQuerySuccessAction = createAction(
    '[Workflow] getQueuedItemsForQuerySuccessAction',
    props<{items: QueuedItemsResponce[]}>()
);


export const getParamsAction = createAction(
    '[Workflow] getParamsAction',
    props<GetParams>()
);

export const getParamsSuccessAction = createAction(
    '[Workflow] getParamsSuccessAction',
    props<{params: ParamsResponce}>()
);

export const getUserInfoAction = createAction(
    '[Workflow] getUserInfoAction',
    props<GetParams>()
);

export const getUserInfoSuccessAction = createAction(
    '[Workflow] getUserInfoSuccessAction',
    props<{userInfo: userInfo}>()
);

export const UpdateQueueItemStatusAndQueueIdAction = createAction(
    '[Workflow] UpdateQueueItemStatusAndQueueIdAction',
    props<UpdateQueueItemStatusAndQueueId>()
);

export const getNotesForDocumentAction = createAction(
    '[Workflow] getNotesForDocumentAction',
    props<getNotesForDocument>()
);

export const editTransactionAction = createAction(
    '[research] editTransactionAction',
    props<{id: string, title: string}>()
);

export const getNotesForDocumentActionSuccessAction = createAction(
    '[Workflow] getNotesForDocumentActionSuccessAction',
    props<{note: getNotesForDocumentResponce}>()
);

export const addDocumentNoteAction = createAction(
    '[Workflow] addDocumentNoteAction',
    props<addDocumentNote>()
);

export const getQueueItemHistoryAction = createAction(
    '[Workflow] getQueueItemHistoryAction',
    props<getQueueItemHistory>()
);

export const getQueueItemHistorySuccessAction = createAction(
    '[Workflow] getQueueItemHistorySuccessAction',
    props<{items: QueuedItemsResponce[]}>()
);




export const moveAssignedProfilesItemAction = createAction(
    '[Administration] moveAssignedProfilesItemAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveUnassignedProfilesItemAction = createAction(
    '[Administration] moveUnassignedProfilesItemAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveAssignedRolesItemAction = createAction(
    '[Administration] moveAssignedRolesItemAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveUnassignedRolesItemAction = createAction(
    '[Administration] moveUnassignedRolesItemAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveAssignedDashboardItemAction = createAction(
    '[Administration] moveAssignedDashboardItemAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveUnassignedDashboardItemAction = createAction(
    '[Administration] moveUnassignedDashboardItemAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveAssignedReportsItemAction = createAction(
    '[Administration] moveAssignedReportsItemAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveUnassignedReportsItemAction = createAction(
    '[Administration] moveUnassignedReportsItemAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveToAssignedProfilesAction = createAction(
    '[Administration] moveToAssignedProfilesAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveToUnassignedProfilesAction = createAction(
    '[Administration] moveToUnassignedProfilesAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveToAssignedRolesAction = createAction(
    '[Administration] moveToAssignedRolesAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveToUnassignedRolesAction = createAction(
    '[Administration] moveToUnassignedRolesAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveToAssignedDashboardAction = createAction(
    '[Administration] moveToAssignedDashboardAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveToUnassignedDashboardAction = createAction(
    '[Administration] moveToUnassignedDashboardAction',
    props<{prevIndex: number, currIndex: number}>()
);

export const moveToAssignedReportsAction = createAction(
    '[Administration] moveToAssignedReportsAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveToUnassignedReportsAction = createAction(
    '[Administration] moveToUnassignedReportsAction',
    props<{prevIndex: number, currIndex: number, category: string}>()
);

export const moveToAssignedProfilesListAction = createAction(
    '[Administration] moveToAssignedProfilesListAction',
    props<{items: Array<dndItem>}>()
);

export const moveToUnassignedProfilesListItemAction = createAction(
    '[Administration] moveToUnassignedProfilesListItemAction',
    props<{items: Array<dndItem>}>()
);

export const moveToAssignedRolesListAction = createAction(
    '[Administration] moveToAssignedRolesListAction',
    props<{items: Array<dndItem>, category: string}>()
);

export const moveToUnassignedRolesListItemAction = createAction(
    '[Administration] moveToUnassignedRolesListItemAction',
    props<{items: Array<dndItem>, category: string}>()
);

export const moveToAssignedDashboardListAction = createAction(
    '[Administration] moveToAssignedProfilesListAction',
    props<{items: Array<dndItem>}>()
);

export const moveToUnassignedDashboardListItemAction = createAction(
    '[Administration] moveToUnassignedProfilesListItemAction',
    props<{items: Array<dndItem>}>()
);

export const moveToAssignedReportsListAction = createAction(
    '[Administration] moveToAssignedReportsListAction',
    props<{items: Array<dndItem>, category: string}>()
);

export const moveToUnassignedReportsListItemAction = createAction(
    '[Administration] moveToUnassignedReportsListItemAction',
    props<{items: Array<dndItem>, category: string}>()
);

export const changeAssignedDomainsAction = createAction(
    '[Administration] changeAssignedDomainsAction',
    props<{items: Array<TodoItemFlatNode>, category: string}>()
);

export const changeAssignedQueueAction = createAction(
    '[Administration] changeAssignedQueueAction',
    props<{items: Array<TodoItemFlatNode>, category: string}>()
);

















