import { createSlice } from "@reduxjs/toolkit";

const mail = createSlice({
    name: 'mail',
    initialState: {
        unread: 0,
        mail: []
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
                console.log('if')
                mail.showcontent = !mail.showcontent
            } else {
                console.log('else')
                mail.showcontent = !mail.showcontent
                mail.read = 1
                const a = state.unread
                state.unread = a - 1
            }
        }
    }
})

export const mailactions = mail.actions;
export default mail.reducer;