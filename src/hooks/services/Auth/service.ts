import { auth } from "@/firebase/config"
import { database } from "@/firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { deleteCookie, setCookie } from "cookies-next"

import { createMutation } from "react-query-kit"
import { CreateUserType, LoginUserType } from "./model"
import { TypeAccount } from "@/constants/type"

export const useCreateUser = createMutation({
  mutationFn: async ({
    email,
    password,
    type,
    address,
    phoneNumber,
    fullName,
  }: CreateUserType) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    const data = {
      fullName: fullName,
      email: email,
      address: address || "",
      phoneNumber: phoneNumber || "",
      type: type,
      role: [],
      id: auth.currentUser?.uid,
    }

    if (result) {
      await setDoc(doc(database, "users", result.user.uid), data)
      await sendEmailVerification(result.user)
    }

    return {
      user: result.user,
    }
  },
})

export const useLoginUser = createMutation({
  mutationFn: async ({ email, password }: LoginUserType) => {
    const result = await signInWithEmailAndPassword(auth, email, password)

    const docRef = await getDoc(doc(database, "users", result.user.uid))
    const userData = docRef.data()

    return { user: result.user, type: userData?.type as TypeAccount }
  },
})

export const useSendEmailResetPassword = createMutation({
  mutationFn: async ({ email }: { email: string }) => {
    const res = await sendPasswordResetEmail(auth, email).then(() => {
      return { status: true, email }
    })

    if (res) {
      return res
    }
  },
})

export const useResetPassword = createMutation({
  mutationFn: async ({
    code,
    password,
  }: {
    code: string
    password: string
  }) => {
    const res = await confirmPasswordReset(auth, code, password).then(() => {
      return { status: true }
    })

    if (res) {
      deleteCookie("email-reset-password")
      return res
    }
  },
})
