import { auth, database } from "@/firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { deleteCookie, setCookie } from "cookies-next"

import { createMutation } from "react-query-kit"
import { CreateUserType, LoginUserType } from "./model"
import { QueryHook, TypeAccount } from "@/constants/type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

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
      address: address || null,
      phoneNumber: phoneNumber || "",
      type: type,
      role: [],
      id: auth.currentUser?.uid,
      indexAddressSelected: 0
    }

    if (result) {
      await updateProfile(result.user, {
        displayName: fullName,
      })
      await setDoc(doc(database, "users", result.user.uid), data)
      await sendEmailVerification(result.user)
    }

    return {
      user: result.user,
    }
  },
})

export const useEditUser = createMutation({
  mutationFn: async ({
    id,
    fullName,
    email,
    address,
    phoneNumber,
    type,
    indexAddressSelected
  }: {
    id: string
    fullName?: string
    email?: string
    address?: string | null
    phoneNumber?: string
    type?: TypeAccount
    indexAddressSelected?: number
  }) => {
    const docRef = doc(database, "users", id)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      const data = docSnapshot.data()

      const updatedData = {
        fullName: fullName || data?.fullName,
        email: email || data?.email,
        address: address || data?.address,
        phoneNumber: phoneNumber || data?.phoneNumber,
        type: type || data?.type,
        indexAddressSelected: indexAddressSelected !== undefined ? indexAddressSelected : data?.indexAddressSelected
      }

      await setDoc(docRef, updatedData)

      return { status: true }
    }
    throw new Error("User not found")
  },
})


export const useGetUserById = (id: string): QueryHook => {
  const { data, status, isFetching } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const docRef = doc(database, "users", id)
      const response = await getDoc(docRef);
      return response?.data();
    },
    enabled: !!id,
  });
  return { data, status, isFetching };
};

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
