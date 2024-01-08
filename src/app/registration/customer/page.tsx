import { UserRegistrationForm } from "@/components/form/UserRegistrationForm"
import { TypeAccount } from "@/constants/type"

const Page = () => {
  return (
    <div>
      <UserRegistrationForm type={TypeAccount.CUSTOMER} />
    </div>
  )
}

export default Page
