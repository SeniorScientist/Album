import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'
import { GithubAuthProvider, GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth'
import { AuthContext } from './auth-context'
interface IAuthProviderProps {
  children: JSX.Element
}

export default function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  function signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function googleSignIn(): Promise<UserCredential> {
    const Provider = new GoogleAuthProvider()
    return signInWithPopup(auth, Provider)
  }

  function githubSignIn(): Promise<UserCredential> {
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(): Promise<void> {
    return auth.signOut()
  }

  function resetPassword(email: string): Promise<void> {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email: string): Promise<any> {
    return currentUser!.updateEmail(email)
  }

  function updatePassword(password: string): Promise<any> {
    return currentUser!.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signUp,
    googleSignIn,
    githubSignIn,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}