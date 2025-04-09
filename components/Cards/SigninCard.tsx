import { SigninForm } from "../Form/Signin";

export const SigninCard = () => {
    return (
        <div className="custom-card-base">
            <h2 className="text-xl font-bold text-[var(--pink)] mb-4">Sign In</h2>
            <SigninForm/>
        </div>
    )
}