export const ACTIONS = {
    POST_DETAILS: 'POST_DETAILS',
    POST_RECORDS: 'POST_RECORDS',
    DELETE_RECORD: 'DELETE_RECORD',
    FETCH_RECORDS: 'FETCH_RECORDS',
    FAIL_FETCH_RECORDS: 'FAIL_FETCH_RECORDS'
};

export const postDetails = (payload) => {
    return {
        type: ACTIONS.POST_DETAILS,
        payload
    }
};

export const postRecords = (payload) => {
    return {
        type: ACTIONS.POST_RECORDS,
        payload
    }
}

export const deleteRecord = (payload) => {
    return {
        type: ACTIONS.DELETE_RECORD,
        payload
    }
};

export const dataFetched = () => {
    return {
        type: ACTIONS.FETCH_RECORDS
    }
};

export const failFetched = () => {
    return {
        type: ACTIONS.FAIL_FETCH_RECORDS
    }
};