import { AuthForm } from "@/components/AuthForm";

export default async function AdminLoginPage () {
    return (
        <section className='flex grow items-center justify-center'>
            <AuthForm />
        </section>
    );
}
