import Link from "next/link";

const Faq = () => {
    return (
        <div>
            <p className="text-sm text-slate-500 mb-4">
            <Link
              href="/user/FAQ"
              className="text-slate-600 hover:text-orange-500 transition duration-200 hover:underline"
            >
              ¿Necesitas ayuda?
            </Link>
          </p>
        </div>
    );
};

export default Faq;