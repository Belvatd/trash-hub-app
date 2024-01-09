import ResetPasswordForm from "./components/ResetPasswordForm"

const Page = () => {
  return (
    <div className="bg-patern h-screen w-full p-2 pt-3">
      <div className="grid w-full gap-5 rounded-2xl bg-white p-4 pb-5">
        <div>
          <p className="text-xl font-semibold text-gray900">Lupa Kata Sandi</p>
          <p className="mt-2 text-sm text-gray500">
            Silahkan masukan email anda
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default Page
