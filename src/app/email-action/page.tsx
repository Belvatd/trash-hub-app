type TPageProps = {
  searchParams: {
    action?: "verifyEmail" | "resetPassword"
  }
}

const Page = ({ searchParams }: TPageProps) => {
  return <div>Email {searchParams?.action} telah Terkirim. Silahkan cek email anda</div>
}

export default Page
