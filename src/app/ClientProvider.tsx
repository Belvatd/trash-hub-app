"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { User, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { usePathname, useRouter } from "next/navigation"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { TypeAccount } from "@/constants/type"
import { auth, database } from "@/firebase/config"

const restrictedPath = ["/cleaner", "/customer"]

type TAuthContext = {
  user?: User
  setUserLogin?: (data: User) => void
}

const AuthContext = createContext<TAuthContext>({})
export const useAuth = () => useContext<TAuthContext>(AuthContext)

const ClientProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User>()
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname()
  const router = useRouter()

  const isRestricted = restrictedPath.some((path) => pathname.startsWith(path))

  const setUserLogin = (data: User) => setUser(data)

  const handleAuthentication = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && !user) {
        setUser(currentUser)
      }

      if (isRestricted && !currentUser) {
        return router.push("/")
      }

      if (currentUser && currentUser.emailVerified && !isRestricted) {
        const docRef = await getDoc(doc(database, "users", currentUser.uid))
        const data: any = docRef.data()

        if (data?.type === TypeAccount.CLEANER) {
          router.push("/cleaner")
        }

        if (data?.type === TypeAccount.CUSTOMER) {
          router.push("/customer")
        }
      }
    })
  }

  useEffect(() => {
    handleAuthentication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUserLogin }}>
        {props.children}
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export default ClientProvider
