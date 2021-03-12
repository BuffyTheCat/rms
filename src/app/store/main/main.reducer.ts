import { Action, createReducer, on } from '@ngrx/store';
import { QueuedItemsResponce, getNotesForDocumentResponce, ParamsResponce, userInfo, theme } from '../../shared/interfaces/queued-items-interface';
import { getQueuedItemsForQuerySuccessAction, getNotesForDocumentActionSuccessAction, getParamsSuccessAction, getUserInfoSuccessAction, moveAssignedProfilesItemAction, moveUnassignedProfilesItemAction, moveToAssignedProfilesAction, moveToUnassignedProfilesAction, moveToUnassignedProfilesListItemAction, moveToAssignedProfilesListAction, moveToUnassignedRolesListItemAction, moveToAssignedRolesListAction, moveUnassignedRolesItemAction, moveAssignedRolesItemAction, moveToAssignedRolesAction, moveToUnassignedRolesAction, moveAssignedDashboardItemAction, moveUnassignedDashboardItemAction, moveToAssignedDashboardAction, moveToUnassignedDashboardAction, moveToAssignedDashboardListAction, moveToUnassignedDashboardListItemAction, moveAssignedReportsItemAction, moveUnassignedReportsItemAction, moveToUnassignedReportsAction, moveToAssignedReportsAction, moveToUnassignedReportsListItemAction, moveToAssignedReportsListAction, changeAssignedDomainsAction, changeAssignedQueueAction, changeGlobalProviderAction, getThemeSuccessAction, setThemeAction, setDarkModeAction } from './main.action';

export interface QueueState {
    items: QueuedItemsResponce[],
    notes: getNotesForDocumentResponce[],
    params: ParamsResponce,
    userInfo: userInfo,
    theme: theme,
    darkMode: boolean
}

export const initialState: QueueState = {
    items: null,
    params: null,
    notes: [],
    userInfo: null,
    theme: null,
    darkMode: false
};    

const QueueReducer = createReducer(
    initialState,

    on(getThemeSuccessAction, (state, { theme }) => {
        return {
            ...state,
            theme: theme
        }
    }),

    on(setDarkModeAction, (state, { isDarkMode }) => {
        return {
            ...state,
            darkMode: isDarkMode
        }
    }),

    on(setThemeAction, (state, { theme }) => {
        return {
            ...state,
            theme: theme
        }
    }),

    on(getQueuedItemsForQuerySuccessAction, (state, { items }) => {
        return {
            ...state,
            items: items
        }
    }),

    on(changeGlobalProviderAction, (state, {provider}) => {
        return {
            ...state,
            params: {
                ...state.params,
                providerSelectedOption: provider
            }
        }
    }),


    on(getParamsSuccessAction, (state, { params }) => {
        return {
            ...state,
            params: params
        }
    }),

    on(getUserInfoSuccessAction, (state, { userInfo }) => {
        return {
            ...state,
            userInfo: userInfo
        }
    }),

    on(getNotesForDocumentActionSuccessAction, (state, { note }) => {
        return {
            ...state,
            notes: [...state.notes, {...note}]
        }
    }),

    on(moveAssignedProfilesItemAction, (state, {prevIndex, currIndex }) => {
        let item = state.userInfo.profilesAssigned[prevIndex];
        let newArr = [
            ...state.userInfo.profilesAssigned.slice(0, prevIndex),
            ...state.userInfo.profilesAssigned.slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesAssigned: newArr
            }
        }
    }),

    on(moveUnassignedProfilesItemAction, (state, {prevIndex, currIndex }) => {
        
        let item = state.userInfo.profilesUnassigned[prevIndex];
        let newArr = [
            ...state.userInfo.profilesUnassigned.slice(0, prevIndex),
            ...state.userInfo.profilesUnassigned.slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesUnassigned: newArr
            }
        }
    }),

    on(moveAssignedRolesItemAction, (state, {prevIndex, currIndex, category }) => {
        let item = state.userInfo.rolesAssigned[category][prevIndex];
        let newArr = [
            ...state.userInfo.rolesAssigned[category].slice(0, prevIndex),
            ...state.userInfo.rolesAssigned[category].slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesAssigned: {
                    ...state.userInfo.rolesAssigned,
                    [category]: newArr
                }
            }
        }
    }),

    on(moveUnassignedRolesItemAction, (state, {prevIndex, currIndex, category }) => {
        
        let item = state.userInfo.rolesUnassigned[category][prevIndex];
        let newArr = [
            ...state.userInfo.rolesUnassigned[category].slice(0, prevIndex),
            ...state.userInfo.rolesUnassigned[category].slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesUnassigned: {
                    ...state.userInfo.rolesUnassigned,
                    [category]: newArr
                }
            }
        }
    }),

    on(moveAssignedDashboardItemAction, (state, {prevIndex, currIndex }) => {
        let item = state.userInfo.dashboardAssigned[prevIndex];
        let newArr = [
            ...state.userInfo.dashboardAssigned.slice(0, prevIndex),
            ...state.userInfo.dashboardAssigned.slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardAssigned: newArr
            }
        }
    }),

    on(moveUnassignedDashboardItemAction, (state, {prevIndex, currIndex }) => {
        
        let item = state.userInfo.dashboardUnassigned[prevIndex];
        let newArr = [
            ...state.userInfo.dashboardUnassigned.slice(0, prevIndex),
            ...state.userInfo.dashboardUnassigned.slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardUnassigned: newArr
            }
        }
    }),

    on(moveAssignedReportsItemAction, (state, {prevIndex, currIndex, category }) => {
        let item = state.userInfo.reportsAssigned[category][prevIndex];
        let newArr = [
            ...state.userInfo.reportsAssigned[category].slice(0, prevIndex),
            ...state.userInfo.reportsAssigned[category].slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsAssigned: {
                    ...state.userInfo.reportsAssigned,
                    [category]: newArr
                }
            }
        }
    }),

    on(moveUnassignedReportsItemAction, (state, {prevIndex, currIndex, category }) => {
        
        let item = state.userInfo.reportsUnassigned[category][prevIndex];
        let newArr = [
            ...state.userInfo.reportsUnassigned[category].slice(0, prevIndex),
            ...state.userInfo.reportsUnassigned[category].slice(prevIndex + 1),
        ];
        newArr.splice(currIndex, 0, item)
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsUnassigned: {
                    ...state.userInfo.reportsUnassigned,
                    [category]: newArr
                }
            }
        }
    }),

    on(moveToUnassignedProfilesAction, (state, {prevIndex, currIndex }) => {
        
        let item = state.userInfo.profilesAssigned[prevIndex];
        let assignedArr = [
            ...state.userInfo.profilesAssigned.slice(0, prevIndex),
            ...state.userInfo.profilesAssigned.slice(prevIndex + 1),
        ];
        let unassignedArr = state.userInfo.profilesUnassigned.slice()
        unassignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesUnassigned: unassignedArr,
                profilesAssigned: assignedArr
            }
        }
    }),

    on(moveToAssignedProfilesAction, (state, {prevIndex, currIndex }) => {
        let item = state.userInfo.profilesUnassigned[prevIndex];
        let unassignedArr = [
            ...state.userInfo.profilesUnassigned.slice(0, prevIndex),
            ...state.userInfo.profilesUnassigned.slice(prevIndex + 1),
        ];
        let assignedArr = state.userInfo.profilesAssigned.slice()
        assignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesUnassigned: unassignedArr,
                profilesAssigned: assignedArr
            }
        }
    }),

    on(moveToUnassignedRolesAction, (state, {prevIndex, currIndex, category }) => {
        
        let item = state.userInfo.rolesAssigned[category][prevIndex];
        let assignedArr = [
            ...state.userInfo.rolesAssigned[category].slice(0, prevIndex),
            ...state.userInfo.rolesAssigned[category].slice(prevIndex + 1),
        ];
        let unassignedArr = state.userInfo.rolesUnassigned[category].slice()
        unassignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesUnassigned: {
                    ...state.userInfo.rolesUnassigned,
                    [category]: unassignedArr 
                },
                rolesAssigned: {
                    ...state.userInfo.rolesAssigned,
                    [category]: assignedArr
                }
            }
        }
    }),

    on(moveToAssignedRolesAction, (state, {prevIndex, currIndex, category }) => {
        let item = state.userInfo.rolesUnassigned[category][prevIndex];
        
        let unassignedArr = [
            ...state.userInfo.rolesUnassigned[category].slice(0, prevIndex),
            ...state.userInfo.rolesUnassigned[category].slice(prevIndex + 1),
        ];
        let assignedArr = state.userInfo.rolesAssigned[category].slice()
        assignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesUnassigned: {
                    ...state.userInfo.rolesUnassigned,
                    [category]: unassignedArr 
                },
                rolesAssigned: {
                    ...state.userInfo.rolesAssigned,
                    [category]: assignedArr 
                } 
            }
        }
    }),

    on(moveToUnassignedDashboardAction, (state, {prevIndex, currIndex }) => {
        
        let item = state.userInfo.dashboardAssigned[prevIndex];
        let assignedArr = [
            ...state.userInfo.dashboardAssigned.slice(0, prevIndex),
            ...state.userInfo.dashboardAssigned.slice(prevIndex + 1),
        ];
        let unassignedArr = state.userInfo.dashboardUnassigned.slice()
        unassignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardUnassigned: unassignedArr,
                dashboardAssigned: assignedArr
            }
        }
    }),

    on(moveToAssignedDashboardAction, (state, {prevIndex, currIndex }) => {
        let item = state.userInfo.dashboardUnassigned[prevIndex];
        let unassignedArr = [
            ...state.userInfo.dashboardUnassigned.slice(0, prevIndex),
            ...state.userInfo.dashboardUnassigned.slice(prevIndex + 1),
        ];
        let assignedArr = state.userInfo.dashboardAssigned.slice()
        assignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardUnassigned: unassignedArr,
                dashboardAssigned: assignedArr
            }
        }
    }),

    on(moveToUnassignedReportsAction, (state, {prevIndex, currIndex, category }) => {
        
        let item = state.userInfo.reportsAssigned[category][prevIndex];
        let assignedArr = [
            ...state.userInfo.reportsAssigned[category].slice(0, prevIndex),
            ...state.userInfo.reportsAssigned[category].slice(prevIndex + 1),
        ];
        let unassignedArr = state.userInfo.reportsUnassigned[category].slice()
        unassignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsUnassigned: {
                    ...state.userInfo.reportsUnassigned,
                    [category]: unassignedArr 
                },
                reportsAssigned: {
                    ...state.userInfo.reportsAssigned,
                    [category]: assignedArr
                }
            }
        }
    }),

    on(moveToAssignedReportsAction, (state, {prevIndex, currIndex, category }) => {
        let item = state.userInfo.reportsUnassigned[category][prevIndex];
        
        let unassignedArr = [
            ...state.userInfo.reportsUnassigned[category].slice(0, prevIndex),
            ...state.userInfo.reportsUnassigned[category].slice(prevIndex + 1),
        ];
        let assignedArr = state.userInfo.reportsAssigned[category].slice()
        assignedArr.splice(currIndex, 0, item);
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsUnassigned: {
                    ...state.userInfo.reportsUnassigned,
                    [category]: unassignedArr 
                },
                reportsAssigned: {
                    ...state.userInfo.reportsAssigned,
                    [category]: assignedArr 
                } 
            }
        }
    }),

    on(moveToUnassignedProfilesListItemAction, (state, {items }) => {
        let newAssigned = state.userInfo.profilesAssigned.filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesAssigned: newAssigned,
                profilesUnassigned: [
                    ...items,
                    ...state.userInfo.profilesUnassigned
                ]
            }
        }
    }),

    on(moveToAssignedProfilesListAction, (state, {items }) => {
        let newUnassigned =  state.userInfo.profilesUnassigned.filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                profilesUnassigned: newUnassigned,
                profilesAssigned: [
                    ...items,
                    ...state.userInfo.profilesAssigned
                ]
            }
        }
    }),

    on(moveToUnassignedRolesListItemAction, (state, {items, category }) => {
        let newAssigned = state.userInfo.rolesAssigned[category].filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesAssigned: {
                    ...state.userInfo.rolesAssigned,
                    [category] : newAssigned
                },
                rolesUnassigned: {
                    ...state.userInfo.rolesUnassigned,
                    [category] : [
                        ...items,
                        ...state.userInfo.rolesUnassigned[category]
                    ]
                }
            }
        }
    }),

    on(moveToAssignedRolesListAction, (state, {items, category }) => {
        let newUnassigned =  state.userInfo.rolesUnassigned[category].filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                rolesUnassigned: {
                    ...state.userInfo.rolesUnassigned,
                    [category] : newUnassigned
                },
                rolesAssigned: {
                    ...state.userInfo.rolesAssigned,
                    [category] : [
                        ...items,
                        ...state.userInfo.rolesAssigned[category]
                    ]
                }
            }
        }
    }),

    on(moveToUnassignedDashboardListItemAction, (state, {items }) => {
        let newAssigned = state.userInfo.dashboardAssigned.filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardAssigned: newAssigned,
                dashboardUnassigned: [
                    ...items,
                    ...state.userInfo.dashboardUnassigned
                ]
            }
        }
    }),

    on(moveToAssignedDashboardListAction, (state, {items }) => {
        let newUnassigned =  state.userInfo.dashboardUnassigned.filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                dashboardUnassigned: newUnassigned,
                dashboardAssigned: [
                    ...items,
                    ...state.userInfo.dashboardAssigned
                ]
            }
        }
    }),

    on(moveToUnassignedReportsListItemAction, (state, {items, category }) => {
        let newAssigned = state.userInfo.reportsAssigned[category].filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsAssigned: {
                    ...state.userInfo.reportsAssigned,
                    [category] : newAssigned
                },
                reportsUnassigned: {
                    ...state.userInfo.reportsUnassigned,
                    [category] : [
                        ...items,
                        ...state.userInfo.reportsUnassigned[category]
                    ]
                }
            }
        }
    }),

    on(moveToAssignedReportsListAction, (state, {items, category }) => {
        let newUnassigned =  state.userInfo.reportsUnassigned[category].filter(item => !items.includes(item));
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                reportsUnassigned: {
                    ...state.userInfo.reportsUnassigned,
                    [category] : newUnassigned
                },
                reportsAssigned: {
                    ...state.userInfo.reportsAssigned,
                    [category] : [
                        ...items,
                        ...state.userInfo.reportsAssigned[category]
                    ]
                }
            }
        }
    }),

    on(changeAssignedDomainsAction, (state, {items, category}) => {
        const arr = Object.values(items);
        const res = arr.map(({ item }) => item);
        console.log(state.userInfo.domains[category]);  
        let copy = JSON.parse(JSON.stringify(state.userInfo.domains[category])); 
        

        res.forEach((name, i) => {
            if (name !== undefined) {
                const changed = findByName(copy, name);
                copy = changed;
            }
        });
        
        function findByName(data, name) {
            function iter(a) {
                if (a.name === name) {
                    a.assigned = !a.assigned;
                    return true;
                }
                return Array.isArray(a.childGroups) && a.childGroups.some(iter);
            }
        
            data.some(iter);
            return data
        }
        
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                domains: {
                    ...state.userInfo.domains,
                    [category]: copy
                } 
            }
        }
    }),

    on(changeAssignedQueueAction, (state, {items, category}) => {
        const arr = Object.values(items);
        const res = arr.map(({ item }) => item);
        let copy = JSON.parse(JSON.stringify(state.userInfo.queues[category])); 
        

        res.forEach((name, i) => {
            if (name !== undefined) {
                const changed = findByName(copy, name);
                copy = changed;
            }
        });
        
        function findByName(data, name) {
            function iter(a) {
                if (a.name === name) {
                    a.assigned = !a.assigned;
                    return true;
                }
                return Array.isArray(a.childGroups) && a.childGroups.some(iter);
            }
        
            data.some(iter);
            return data
        }
        
        
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                queues: {
                    ...state.userInfo.queues,
                    [category]: copy
                } 
            }
        }
    }),
);

export function reducer(state: QueueState | undefined, action: Action) {
    return QueueReducer(state, action)
}

