import Link from "next/link";

function CarteTravailAR({ data }) {
    const { title, detail, slug, cours, delais, rendu } = data;
    return (
        <div className="p-4 rounded-md border border-gray-200 shadow-md flex flex-col gap-2">
            <div className="flex flex-row justify-between">
                <Link href={'/my/travail-a-rendre/' + slug} className="font-bold text-gray-700 hover:underline">{title}</Link>
                {rendu ? <RenduFlag /> : <NonRenduFlag />}
            </div>
            <h2 className="text-md">{cours}</h2>
            <p className="text-sm text-gray-700">{detail}</p>
            <div className="flex flex-row justify-between">
                <span className="text-gray-500 font-semibold">Dernier Délais :</span>
                <span className="text-muted-foreground">{delais}</span>
            </div>
        </div>
    );
}

function RenduFlag() {
    return <span className="rounded-lg bg-green-400 text-sm text-white p-1.5">Rendu</span>;
}

function NonRenduFlag() {
    return <span className="rounded-lg bg-red-400 text-sm text-white p-1.5">Non Rendu</span>;
}

export default CarteTravailAR;