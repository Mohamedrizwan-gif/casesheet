import { ACTIONS } from './action';

const initialState = {
    patient_details: {
        name: '',
        age: null,
        gender: '',
        dob: '',
        bloodgroup: '',
        occupation: '',
        address: '',
        phone_no: null,
        cheif_complaint: '',
        associate_complaint: '',
        past_history: '',
        medical_history: '',
        family_history: '',
        food: '',
        urine: '',
        stool: '',
        sleep: '',
        others: '',
        bp: '',
        pulse: '',
        rs: '',
        cvs: '',
        temp: '',
        systematicexamination: '',
        investigation: '',
        diagnosis: '',
        differentialdiagnosis: ''
    },
    records: [],
    isFetched: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.POST_DETAILS:
            return {...state, patient_details: {...state.patient_details, ...action.payload } };
        case ACTIONS.POST_RECORDS:
            return {...state, records: [...action.payload] };
        case ACTIONS.DELETE_RECORD:
            return {...state, records: state.records.filter(rec => rec._id !== action.payload) };
        case ACTIONS.FETCH_RECORDS:
            return {...state, isFetched: true };
        case ACTIONS.FAIL_FETCH_RECORDS:
            return {...state, isFetched: false };
        default:
            return state;
    }
}

export default reducer;