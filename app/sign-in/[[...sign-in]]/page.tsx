import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <SignIn afterSignInUrl="/new-user" redirectUrl="/new-user" />
}
