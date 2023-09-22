import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return <SignUp afterSignInUrl="/new-user" redirectUrl="/new-user" />
}
