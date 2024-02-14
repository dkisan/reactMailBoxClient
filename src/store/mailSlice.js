import { createSlice } from "@reduxjs/toolkit";

const mail = createSlice({
    name: 'mail',
    initialState: {
        unread: 0,
        mail: [],
        user: localStorage.getItem('MailboxUEmail') || null
    },
    reducers: {
        setUnread: (state, action) => {
            state.unread = action.payload
        },
        setMail: (state, action) => {
            state.mail = action.payload
        },
        showdecreaseHandler: (state, action) => {
            const idx = state.mail.findIndex(m => m.key === action.payload)
            const mail = state.mail[idx]
            if (mail.read) {
                mail.showcontent = !mail.showcontent
            } else {
                mail.showcontent = !mail.showcontent
                mail.read = 1
                const a = state.unread
                state.unread = a - 1
            }
        },
        deleteMail : (state,action)=>{
            state.mail = state.mail.filter(m => m.key !== action.payload)
        }
    }
})

export const mailactions = mail.actions;
export default mail.reducer;