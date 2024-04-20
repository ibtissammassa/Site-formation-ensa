function TeaserVideo() {
    return ( 
        <div className="flex my-7 flex-col h-[95vh] px-40 text-center gap-9 justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-4xl font-bold">Découvrez en Avance</h1>
                <p className="text-slate-700"> Embarquez pour une Aventure Passionnante : Découvrez ce qui vous Attend en Regardant Notre Vidéo Teaser !</p>
            </div>
            <iframe className="w-full rounded-md h-full" src="https://www.youtube.com/embed/rLsjtEClNYU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen frameBorder="0"></iframe> 
        </div>
     );
}

export default TeaserVideo;