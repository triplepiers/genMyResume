import { LoginForm } from "../Form/Login"

export const LoginCard = () => {
    return (
        <div className="custom-card-base flex flex-col">
            <h2 className="text-xl font-bold mb-2 w-full text-center">
                Log In
            </h2>
            <div className="h-full">
                <LoginForm />
            </div>
        </div>
    )
}