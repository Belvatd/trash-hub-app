import { UserRegistrationForm } from "@/app/(form)/UserRegistrationForm"
import { TypeAccount } from "@/constants/type"

const Page = () => {
  return (
    <div>
      Register Customer
      <UserRegistrationForm type={TypeAccount.CUSTOMER} />
    </div>
  )
}

export default Page
