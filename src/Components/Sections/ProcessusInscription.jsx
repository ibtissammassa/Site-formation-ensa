function ProcessusInscription() {
    const processus = [
        {
            num: 1,
            title: 'Pré-inscription par cette plateform',
        },
        {
            num: 2,
            title: 'Validation de dossier de condidature',
        },
        {
            num: 3,
            title: 'Entretien orale',
        },
        {
            num: 4,
            title: 'Accées au espace etudiant',
        }
    ]
    return ( 
        <div className="px-6 flex flex-col gap-5">
            <h2 className='font-bold text-xl'>Processus d’inscription</h2>
            <div className="flex flex-col gap-4">
                {
                    processus.map((process, index) => (
                        <div key={index} className='inline-flex gap-6 items-center shadow-md rounded-md p-5 px-7 border'>
                            <h1 className='font-bold text-red-600 text-5xl'>{process.num}</h1>
                            <h2 className="font-bold">{process.title}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
     );
}

export default ProcessusInscription;