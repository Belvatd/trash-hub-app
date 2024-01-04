import { UserRegistrationForm } from "@/app/(form)/UserRegistrationForm"
import { TypeAccount } from "@/constants/type"

const Page = () => {
  return (
    <div>
      Register Cleaner
      <UserRegistrationForm type={TypeAccount.CLEANER} />
    </div>
  )
}

export default Page
