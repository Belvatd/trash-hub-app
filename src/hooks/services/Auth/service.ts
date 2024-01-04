import { auth } from "@/firebase/config"
import { database } from "@/firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { createMutation } from "react-query-kit"
import { CreateUserType, LoginUserType } from "./model"

export const useCreateUser = createMutation({
    mutationFn: async ({ email, password,type, address, phoneNumber, fullName }: CreateUserType) => {
        const result = await createUserWithEmailAndPassword(auth, email, password)

        const data = {
            fullName: fullName,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            type: type,
            role: [],
        }
        if (result) {
            await setDoc(doc(database, "users", result.user.uid), data)
        }

        return {
            ...data,
            uid: result.user.uid,
        }
    },
})

export const useLoginUser = createMutation({
    mutationFn: async ({ email, password }: LoginUserType) => {
        const result = await signInWithEmailAndPassword(auth, email, password)

        const docRef = await getDoc(doc(database, "users", result.user.uid))
        const userData = docRef.data()

        console.log(userData)
        return result
    },
})
