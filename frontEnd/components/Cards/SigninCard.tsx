import { SigninForm } from "../Form/Signin";

export const SigninCard = () => {
    return (
        <div className="custom-card-base">
            <h2 className="text-xl font-bold text-[var(--pink)] mb-2 w-full text-center">
                Sign In
            </h2>
            <SigninForm/>
        </div>
    )
}